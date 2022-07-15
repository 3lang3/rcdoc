import fs from 'fs';
import { visit } from 'unist-util-visit';
import slash from 'slash2';
import type { MDocUnifiedTransformer, MDocElmNode } from '../types';
import path from 'path';
import { getCodeMeta } from '../utils/getCodeMeta';
import { getPreviewerAnalyzeData } from '../utils/getPreviewerAnalyzeData';
import type { IPreviewerTransformerResult } from '../utils/getPreviewerAnalyzeData';

/**
 * cache id for each external demo file
 */
const externalCache = new Map<string, string>();
/**
 * record external demo id count
 */
const externalIdMap = new Map<string, number>();
/**
 * record code block demo id count
 */
const mdCodeBlockIdMap = new Map<string, { id: string; count: number; map: Map<string, number> }>();

/**
 * get unique id for previewer
 * @param yaml          meta data
 * @param mdAbsPath     md absolute path
 * @param codeAbsPath   code absolute path, it is seem as mdAbsPath for embed demo
 */
function getPreviewerId(yaml: Record<string, string>, mdAbsPath: string, codeAbsPath: string) {
  let id = yaml.identifier || yaml.uuid;

  // do not generate identifier for inline demo
  if (yaml.inline) {
    return;
  }

  if (!id) {
    if (mdAbsPath === codeAbsPath) {
      // for code block demo, format: component-demo-N
      const idMap = mdCodeBlockIdMap.get(mdAbsPath);
      id = [idMap.id, idMap.count, 'demo'].filter(Boolean).join('-');

      // record id count
      const currentIdCount = idMap.map.get(id) || 0;

      idMap.map.set(id, currentIdCount + 1);

      // append count suffix
      id += currentIdCount ? `-${currentIdCount}` : '';
    } else {
      // for external demo, format: dir-file-N
      // use cache first
      id = externalCache.get(codeAbsPath);

      if (!id) {
        const words = (slash(codeAbsPath) as string)
          // discard index & suffix like index.tsx
          .replace(/(?:\/index)?(\.[\w-]+)?\.\w+$/, '$1')
          .split(/\//)
          .map((w) => w.toLowerCase());
        // /path/to/index.tsx -> to || /path/to.tsx -> to
        const demoName = words[words.length - 1] || 'demo';
        const prefix = words
          .slice(0, -1)
          .filter((word) => !/^(src|_?demos?|_?examples?)$/.test(word))
          .pop();

        id = `${prefix}-${demoName}`;

        // record id count
        const currentIdCount = externalIdMap.get(id) || 0;

        externalIdMap.set(id, currentIdCount + 1);

        // append count suffix
        id += currentIdCount ? `-${currentIdCount}` : '';

        externalCache.set(codeAbsPath, id);
      }
    }
  }

  return id;
}

/**
 * get demo dependencies meta data from previewer props
 * @param props previewer props
 * @param lang  node lang
 */
function getDemoDeps(
  props: IPreviewerTransformerResult['previewerProps'],
  lang: string,
): Record<string, { type: string; value: string }> {
  return {
    // append npm dependencies
    ...Object.entries(props.dependencies || {}).reduce(
      (deps, [pkg, { version }]) =>
        Object.assign(deps, {
          [pkg]: {
            type: 'NPM',
            // TODO: get real version rule from package.json
            value: version,
          },
        }),
      {},
    ),
    // append local file dependencies
    ...Object.entries(props.sources).reduce((result, [file, item]) => {
      return Object.assign(result, {
        // handle legacy main file
        ...(file === '_'
          ? {
              [`index.${lang}`]: {
                type: 'FILE',
                value: item[lang],
              },
            }
          : {
              [file]: {
                type: 'FILE',
                value: item.content || fs.readFileSync(item.path, 'utf-8').toString(),
              },
            }),
      });
    }, {}),
  };
}

/**
 * remark plugin for generate file meta
 */
export default function previewer(): MDocUnifiedTransformer<MDocElmNode> {
  return (tree, vFile) => {
    const fileAbsPath = this.data('fileAbsPath');
    const remarkOpts = this.data('remarkOpts');
    if (fileAbsPath) {
      const mapObj = mdCodeBlockIdMap.get(fileAbsPath);

      if (!mapObj) {
        // initialize map
        const prefix =
          vFile.data.componentName ||
          path.basename(
            slash(fileAbsPath).replace(/(?:\/(?:index|readme))?(\.[\w-]+)?\.md/i, '$1'),
          );

        mdCodeBlockIdMap.set(fileAbsPath, {
          // save builtin-rule id
          id: prefix,
          // save conflict count
          count: Array.from(mdCodeBlockIdMap.values()).filter((m) => m.id === prefix).length,
          // create code block id map
          map: new Map(),
        });
      } else {
        // clear single paths for a new transform flow
        mapObj.map = new Map();
      }
    }

    visit<MDocElmNode, string>(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'div' && node.properties?.type === 'previewer') {
        // generate demo id
        const identifier = getPreviewerId(
          node.properties.meta,
          fileAbsPath,
          node.properties.filePath || fileAbsPath,
        );

        const result = getPreviewerAnalyzeData({
          node,
          mdAbsPath: fileAbsPath,
          remarkOpts: this.data('remarkOpts'),
          rootPkgJson: this.data('rootPkgJson'),
        });

        let previewerProps: IPreviewerTransformerResult['previewerProps'];

        // fill fields for tranformer result
        const decorateResult = (o) => {
          // extra meta for external demo
          if (node.properties.filePath) {
            const { meta } = getCodeMeta(node.properties.source);

            // save original attr meta on code tag, to avoid node meta override frontmatter in HMR
            node.properties._ATTR_META = node.properties._ATTR_META || node.properties.meta;
            node.properties.meta = Object.assign(meta, node.properties._ATTR_META);
          }

          // set componentName for previewer props
          o.previewerProps.componentName = vFile.data.componentName;

          // assign node meta to previewer props (allow user override props via frontmatter or attribute)
          Object.assign(o.previewerProps, node.properties.meta);

          // force override id for previewer props
          o.previewerProps.identifier = identifier;

          // fallback dependencies & sources
          o.previewerProps.dependencies = o.previewerProps.dependencies || {};
          o.previewerProps.sources = o.previewerProps.sources || {};
          // generate demo dependencies from previewerProps.sources
          if (!o.previewerProps.inline) {
            o.previewerProps.dependencies = getDemoDeps(o.previewerProps, node.properties.lang);
          }

          return o;
        };

        // export result
        ({ previewerProps } = decorateResult(result));

        const componentProps = {
          lang: node.properties.lang,
          dependencies: previewerProps.dependencies as unknown as Record<
            string,
            { type: string; value: string }
          >,
          key: previewerProps.identifier,
          meta: node.properties.meta,
        };

        // use to declare demos in the page component
        vFile.data.demos = (vFile.data.demos || []).concat({
          name: `${remarkOpts.prefix}${(vFile.data.demos?.length || 0) + 1}`,
          code: node.properties?.source,
          inline: previewerProps.inline,
          filePath: node.properties.filePath,
          props: componentProps,
        });

        if (previewerProps.inline) {
          // append demo component directly for inline demo and other transformer result
          parent.children[i] = {
            previewer: true,
            type: 'element',
            tagName: `${remarkOpts.prefix}${vFile.data.demos.length}`,
          } as any;
        } else {
          parent.children[i] = {
            previewer: true,
            type: 'element',
            tagName: 'Previewer',
            properties: {
              'data-previewer-props-replaced': `${vFile.data.demos.length}`,
            },
            children: [
              {
                type: 'element',
                tagName: `${remarkOpts.prefix}${vFile.data.demos.length}`,
                properties: {},
              },
            ],
          } as any;
        }
      }
    });
  };
}

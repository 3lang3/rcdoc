import path from 'path';
import type { Node } from 'unist';
import deepmerge from 'deepmerge';
import { isElement as is } from 'hast-util-is-element';
import { hasProperty as has } from 'hast-util-has-property';
import { visit } from 'unist-util-visit';
import { parseElmAttrToProps } from '../utils/parseElmAttrToProps';
import parser from '../docgen/parser';
import type { MDocUnifiedTransformer, MDocElmNode } from '../types';
import { getModuleResolvePath } from '../utils/moduleResolver';

/**
 * serialize api node to [title, node, title, node, ...]
 * @param node        original api node
 * @param identifier  api parse identifier, mapping in .umi/dumi/apis.json
 * @param definitions api definitions
 */
function serializeAPINodes(
  node: MDocElmNode,
  identifier: string,
  definitions: ReturnType<typeof parser>,
) {
  const parsedAttrs = parseElmAttrToProps(node.properties);
  const expts: string[] = parsedAttrs.exports || Object.keys(definitions);
  const showTitle = !parsedAttrs.hideTitle;

  const nodes = expts.reduce<(MDocElmNode | Node)[]>((list, expt, i) => {
    // render large API title if it is default export
    // or it is the first export and the exports attribute was not custom
    const isInsertAPITitle = expt === 'default' || (!i && !parsedAttrs.exports);
    // render sub title for non-default export
    const isInsertSubTitle = expt !== 'default';
    const apiNode = deepmerge({}, node);

    // insert API title
    if (showTitle && isInsertAPITitle) {
      list.push(
        {
          type: 'element',
          tagName: 'h2',
          properties: {},
          children: [{ type: 'text', value: 'API' } as MDocElmNode],
        },
        {
          type: 'text',
          value: '\n',
        },
      );
    }

    // insert export sub title
    if (showTitle && isInsertSubTitle) {
      list.push(
        {
          type: 'element',
          tagName: 'h3',
          properties: { id: `api-${expt.toLowerCase()}` },
          children: [{ type: 'text', value: expt } as MDocElmNode],
        },
        {
          type: 'text',
          value: '\n',
        },
      );
    }

    // insert API Node
    delete apiNode.properties.exports;
    apiNode.properties.identifier = identifier;
    apiNode.properties.export = expt;
    apiNode.properties.definitions = definitions[expt];

    list.push(apiNode);

    return list;
  }, []);

  return nodes;
}

/**
 * detect component name via file path
 */
function guessComponentName(fileAbsPath: string) {
  const parsed = path.parse(fileAbsPath);

  if (['index', 'index.d'].includes(parsed.name)) {
    // button/index.tsx => button
    // packages/button/src/index.tsx => button
    // packages/button/lib/index.d.ts => button
    // windows: button\\src\\index.tsx => button
    // windows: button\\lib\\index.d.ts => button
    return path.basename(parsed.dir.replace(/(\/|\\)(src|lib)$/, ''));
  }

  // components/button.tsx => button
  return parsed.name;
}

/**
 * remark plugin for parse embed tag to external module
 */
export default function docgen(): MDocUnifiedTransformer<MDocElmNode> {
  return (tree, vFile) => {
    const remarkOpts = this.data('remarkOpts');
    visit<MDocElmNode, string>(tree, 'element', (node, i, parent) => {
      if (is(node, 'API') && remarkOpts?.apiParser) {
        let identifier: string;
        let definitions: ReturnType<typeof parser>;
        const parseOpts = parseElmAttrToProps(node.properties);

        if (has(node, 'src')) {
          const src = node.properties.src || '';
          let absPath = path.join(path.dirname(this.data('fileAbsPath')), src);
          try {
            absPath = getModuleResolvePath({
              basePath: process.cwd(),
              sourcePath: src,
              silent: true,
            });
          } catch (err) {
            // nothing
          }
          // guess component name if there has no identifier property
          const componentName = node.properties.identifier || guessComponentName(absPath);

          parseOpts.componentName = componentName;
          definitions = parser(absPath, parseOpts);
          identifier = componentName || src;
        } else if (vFile.data.componentName) {
          try {
            const sourcePath = getModuleResolvePath({
              basePath: process.cwd(),
              sourcePath: path.dirname(this.data('fileAbsPath')),
              silent: true,
            });
            parseOpts.componentName = vFile.data.componentName;
            definitions = parser(sourcePath, parseOpts);
            identifier = vFile.data.componentName;
          } catch (err) {
            /* noting */
          }
        }

        if (identifier && definitions) {
          // console.log(identifier, definitions)
          // replace original node
          parent.children.splice(i, 1, {
            type: 'element',
            tagName: 'div',
            position: node.position,
            children: serializeAPINodes(node, identifier, definitions),
          } as Node);

          vFile.data.definitions = definitions;
        }
      }
    });
  };
}

import fs from 'fs';
import path from 'path';
import { isElement as is } from 'hast-util-is-element';
import { hasProperty as has } from 'hast-util-has-property';
import { visit } from 'unist-util-visit';
import type { MDocElmNode, MDocUnifiedTransformer } from '../types';

const ATTR_MAPPING = {
  hideactions: 'hideActions',
  defaultshowcode: 'defaultShowCode',
  skipnodemodules: 'skipNodeModules',
  skippropswithoutdoc: 'skipPropsWithoutDoc',
  hidetitle: 'hideTitle',
  demourl: 'demoUrl',
};

/**
 * parse custome HTML element attributes to properties
 * @note  1. empty attribute will convert to true
 *        2. JSON-like string will convert to JSON
 *        3. workaround for restore property to camlCase that caused by hast-util-raw
 * @param   attrs   original attributes
 * @return  parsed properties
 */
export const parseElmAttrToProps = (attrs: Record<string, string>) => {
  const parsed: Record<string, any> = Object.assign({}, attrs);

  // restore camelCase attrs, because hast-util-raw will transform camlCase to lowercase
  Object.entries(ATTR_MAPPING).forEach(([mark, attr]) => {
    if (parsed[mark] !== undefined) {
      parsed[attr] = parsed[mark];
      delete parsed[mark];
    }
  });

  // convert empty string to boolean
  Object.keys(parsed).forEach(attr => {
    if (parsed[attr] === '') {
      parsed[attr] = true;
    }
  });

  // try to parse JSON field value
  Object.keys(parsed).forEach(attr => {
    if (/^(\[|{)[^]*(]|})$/.test(parsed[attr])) {
      try {
        parsed[attr] = JSON.parse(parsed[attr]);
      } catch (err) {
        /* nothing */
      }
    }
  });

  return parsed;
};

/**
 * remark plugin for parse code tag to external demo
 */
export default function code(): MDocUnifiedTransformer<MDocElmNode> {
  return tree => {
    visit<MDocElmNode, string>(tree, 'element', (node, index, parent: any) => {
      if (is(node, 'code') && has(node, 'src')) {
        // const hasCustomTransformer = previewerTransforms.length > 1;
        const { src, ...attrs } = node.properties;
        const props = {
          source: '',
          lang: path.extname(src as string).slice(1),
          filePath: path.join(path.dirname(this.data('fileAbsPath')), src as string),
        };
        const parsedAttrs = parseElmAttrToProps(attrs);

        try {
          props.source = fs.readFileSync(props.filePath, 'utf8').toString();
          props.lang = path.extname(props.filePath).slice(1);
        } catch (err) {
          /* istanbul ignore next */
        }
        parent.tagName = 'div'
        // replace original node
        parent.children.splice(index, 1, {
          type: 'element',
          tagName: 'div',
          position: node.position,
          properties: {
            type: 'previewer',
            ...props,
            src,
            meta: {
              ...parsedAttrs,
            },
          },
        });
      }
    });
  };
}

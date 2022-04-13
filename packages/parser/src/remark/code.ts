import fs from 'fs';
import path from 'path';
import { isElement as is } from 'hast-util-is-element';
import { hasProperty as has } from 'hast-util-has-property';
import { visit } from 'unist-util-visit';
import type { MDocElmNode, MDocUnifiedTransformer } from '../types';
import { parseElmAttrToProps } from '../utils/parseElmAttrToProps';

/**
 * remark plugin for parse code tag to external demo
 */
export default function code(): MDocUnifiedTransformer<MDocElmNode> {
  return (tree) => {
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
        parent.tagName = 'div';
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

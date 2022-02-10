import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';
import { raw } from 'hast-util-raw';
import type { MDocElmNode, MDocUnifiedTransformer } from '../types';
import { winEOL } from '../utils/winEOL';

function createSourceCode(lang: string, code: string, position: any) {
  return {
    type: 'element',
    tagName: 'Previewer',
    position,
    properties: {
      // use wrapper element to workaround for skip props escape
      // https://github.com/mapbox/jsxtreme-markdown/blob/main/packages/htree-util-to-jsx/index.js#L159
      // eslint-disable-next-line no-new-wrappers
      code: new String(JSON.stringify(code)),
      lang: lang || 'unknown',
    },
  };
}

/**
 * rehype plugin for convert pre code block to SourceCode compomnent
 */
export default function pre(): MDocUnifiedTransformer<MDocElmNode> {
  return tree => {
    // handle md code block syntax
    visit<MDocElmNode, string>(tree, 'element', (node, i, parent) => {
      if (node.tagName === 'pre' && node.children?.[0]?.tagName === 'code') {
        const cls = node.children[0].properties.className || [];
        const lang =
          cls.join('').match(/language-(\w+)(?:$| )/)?.[1] || 'unknown';
        parent.children.splice(
          i,
          1,
          createSourceCode(
            lang,
            winEOL(toString(node.children[0] as any).trim()),
            node.position,
          ),
        );
      }
    });

    // handle pre tag syntax
    visit<MDocElmNode, string>(tree, 'raw', (node, i, parent) => {
      if (/^<pre/.test(node.value)) {
        const parsed = raw(node as any) as MDocElmNode;
        if (parsed.tagName === 'pre') {
          const [, content] =
            winEOL(node.value).match(/^<pre[^>]*>\n?([^]*?)<\/pre>$/) || [];

          if (content) {
            parent.children.splice(
              i,
              1,
              createSourceCode(
                parsed.properties.lang,
                content.trim(),
                node.position,
              ),
            );
          }
        }
      }
    });
  };
}

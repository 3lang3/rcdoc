import { visit } from 'unist-util-visit';
import { raw as hastRaw } from 'hast-util-raw';
import { hasProperty as has } from 'hast-util-has-property';
import type { MDocElmNode, MDocUnifiedTransformer } from '../types';

/**
 * detect properties whether has complex value
 * @param props
 */
function hasComplexProp(props: Record<string, any>) {
  return Object.values(props).some(
    prop => ['object', 'function'].includes(typeof prop) || Array.isArray(prop),
  );
}

/**
 * rehype plugin for compile raw node to hast
 */
export default function raw(): MDocUnifiedTransformer<MDocElmNode> {
  return tree => {
    const props = [];

    visit(tree, node => {
      // workaround to avoid parse React Component properties to string in the raw step
      if (typeof node.properties === 'object' && hasComplexProp(node.properties)) {
        props.push(node.properties);
        node.properties = {
          _index: props.length - 1,
        };
      }

      // special process <code />, <code > to <code></code>
      // to avoid non-self-closing exception in the raw step
      if (typeof node.value === 'string' && /<code[^>]*src=/.test(node.value)) {
        node.value = node.value.replace(/ ?\/?>/g, '></code>');
      }
    });

    // raw to hast tree
    const parsed = hastRaw(tree as any) as MDocElmNode;

    // restore React Component & it's properties
    visit<MDocElmNode, string>(parsed, 'element', elm => {
      // restore properties from temp array
      if (has(elm, '_index')) {
        elm.properties = props[elm.properties._index];
      }

      if (/^previewer/.test(elm.tagName)) {
        elm.tagName = 'Previewer'
      }
    });

    return parsed;
  }
};

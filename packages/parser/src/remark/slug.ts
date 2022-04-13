import { toString } from 'mdast-util-to-string';
import { isElement as is } from 'hast-util-is-element';
import { visit } from 'unist-util-visit';
import BananaSlug from 'github-slugger';
import type { MDocElmNode, MDocUnifiedTransformer } from '../types';

const headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

function filterValidChildren(children: MDocElmNode[]) {
  return children.filter((item) => {
    return item.type !== 'element' || !/^[A-Z]/.test(item.tagName);
  });
}

const slugs = new BananaSlug();

/**
 * Plugin to add anchors headings using GitHub’s algorithm.
 */
export default function remarkSlug(): MDocUnifiedTransformer<MDocElmNode> {
  return (tree, vFile) => {
    slugs.reset();
    vFile.data.slugs = [];
    visit<MDocElmNode, string>(tree, 'element', (node) => {
      if (is(node, headings)) {
        const title = toString({
          children: filterValidChildren(node.children),
          value: node.value,
        });
        // generate id if not exist
        node.properties.id = slugs.slug(node.properties.id || title.trim(), false);
        node.properties['data-anchor'] = node.properties.id;

        // save slugs
        vFile.data.slugs.push({
          depth: parseInt(node.tagName[1], 10),
          text: title,
          id: node.properties.id,
        });

        // use first title as page title if not exist
        if (!vFile.data.title) {
          vFile.data.title = title;
        }
      }
    });
  };
}

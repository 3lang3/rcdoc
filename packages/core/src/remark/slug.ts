import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';
import BananaSlug from 'github-slugger';
import type { Plugin } from 'unified';
import { Node, Properties, Root } from 'hast';

const slugs = new BananaSlug();

/**
 * Plugin to add anchors headings using GitHub’s algorithm.
 */
export default function remarkSlug(): Plugin<Root[], Root> {
  return (tree, vFile) => {
    slugs.reset();

    visit<Node, string>(tree, 'heading', (node: any) => {
      const data = node.data || (node.data = {});
      const props = (data.hProperties || (data.hProperties = {})) as Properties;
      let id = props.id;

      id = id ? slugs.slug(String(id), true) : slugs.slug(toString(node));
      data.id = id;
      props.id = id;
      vFile.data.slugs = (vFile.data.slugs || [] as any).concat({ depth: node?.depth, text: node?.children[0].value, id })
    });
  };
}

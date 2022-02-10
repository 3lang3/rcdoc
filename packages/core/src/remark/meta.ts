import { visit } from 'unist-util-visit';
import type { MDocUnifiedTransformer } from '../types'
import yaml from '../utils/yaml';
import type { YamlNode } from './language';

/**
 * remark plugin for generate file meta
 */
export default function meta(): MDocUnifiedTransformer<YamlNode> {
  return (tree, vFile) => {
    visit<YamlNode, string>(tree, 'yaml', (node) => {
      const data = yaml(node.value)
      vFile.data = Object.assign(vFile.data || {}, data);
    });
  };
}

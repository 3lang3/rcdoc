import path from 'path';
import fs from 'fs';
import slash from 'slash2';
import { visit } from 'unist-util-visit';
import { execSync } from 'child_process';
import type { MDocUnifiedTransformer } from '../types';
import yaml from '../utils/yaml';
import type { YamlNode } from './language';
import { getModuleResolvePath } from '../utils/moduleResolver';

/**
 * remark plugin for generate file meta
 */
export default function meta(): MDocUnifiedTransformer<YamlNode> {
  return (tree, vFile) => {
    if (this.data('fileAbsPath')) {
      const filePath = slash(path.relative(process.cwd(), this.data('fileAbsPath')));

      // append file info
      vFile.data.filePath = filePath;

      // try to read file update time from git history
      try {
        vFile.data.updatedTime =
          parseInt(
            execSync(`git log -1 --format=%at ${this.data('fileAbsPath')}`, {
              stdio: 'pipe',
            }).toString(),
            10,
          ) * 1000;
      } catch (err) {
        /* nothing */
      }

      // fallback to file update time
      /* istanbul ignore if */
      if (Number.isNaN(Number(vFile.data.updatedTime))) {
        vFile.data.updatedTime = Math.floor(fs.lstatSync(this.data('fileAbsPath')).mtimeMs);
      }

      // try to find related component of this md
      if (/(?<!\/src)\/README(\.[\w-]+)?\.md/i.test(slash(this.data('fileAbsPath')))) {
        try {
          getModuleResolvePath({
            extensions: ['.tsx'],
            basePath: process.cwd(),
            sourcePath: path.dirname(this.data('fileAbsPath')),
            silent: true,
          });
          // presume A is the related component of A/index.md
          // TODO: find component from entry file for a precise result
          vFile.data.componentName = path.basename(path.parse(this.data('fileAbsPath')).dir);
        } catch (err) {
          /* nothing */
        }
      }
    }
    // frontmatters
    visit<YamlNode, string>(tree, 'yaml', (node) => {
      const data = yaml(node.value);
      vFile.data.frontmatter = Object.assign(vFile.data.frontmatter || {}, data);
    });
  };
}

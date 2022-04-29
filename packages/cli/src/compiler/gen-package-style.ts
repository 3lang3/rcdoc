import path from 'path';
import slash from 'slash2';
import fse from 'fs-extra';
import { createRequire } from 'module';
import { smartOutputFile, normalizePath } from '../common';
import { getCssBaseFile } from '../common/css';
import { STYLE_DEPS_JSON_FILE } from '../common/constant';
import context from '../common/context';

const { existsSync } = fse;

type Options = {
  outputPath: string;
  pathResolver?: (path: string) => string;
};

export function genPackageStyle(options: Options) {
  const require = createRequire(import.meta.url);
  const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
  let content = '';

  let baseFile = getCssBaseFile();

  if (baseFile) {
    if (options.pathResolver) {
      baseFile = options.pathResolver(baseFile);
    }

    content += `@import "${normalizePath(baseFile)}";\n`;
  }

  content += styleDepsJson.sequence
    .map((componentFilePath: string) => {
      let stylePath = path.join(componentFilePath, '..', context.opts?.build?.style);

      if (!existsSync(stylePath)) {
        return '';
      }

      if (options.pathResolver) {
        stylePath = options.pathResolver(stylePath);
      }

      return `@import "${normalizePath(stylePath)}";`;
    })
    .filter((item: string) => !!item)
    .join('\n');

  smartOutputFile(options.outputPath, slash(content));
}

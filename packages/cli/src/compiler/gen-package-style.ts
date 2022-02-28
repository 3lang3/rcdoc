import { join } from 'path';
import { get } from 'lodash-es';
import fse from 'fs-extra';
import { createRequire } from 'module';
import { smartOutputFile, normalizePath } from '../common/index';
import { getCssLang, getCssBaseFile } from '../common/css';
import { PROJECT_SRC_DIR, STYLE_DEPS_JSON_FILE } from '../common/constant';
import context from '../common/context';

const { existsSync } = fse;

type Options = {
  outputPath: string;
  pathResolver?: (path: string) => string;
};

export function genPackageStyle(options: Options) {
  const require = createRequire(import.meta.url);
  const styleDepsJson = require(STYLE_DEPS_JSON_FILE);
  const CSS_LANG = getCssLang();
  const ext = `.${CSS_LANG}`;

  let content = '';

  let baseFile = getCssBaseFile();

  if (baseFile) {
    if (options.pathResolver) {
      baseFile = options.pathResolver(baseFile);
    }

    content += `@import "${normalizePath(baseFile)}";\n`;
  }

  const componentRltDir = get(context.opts, 'build.css.component', './');

  content += styleDepsJson.sequence
    .map((name: string) => {
      let path = join(PROJECT_SRC_DIR, name, componentRltDir, `index${ext}`);

      if (!existsSync(path)) {
        return '';
      }

      if (options.pathResolver) {
        path = options.pathResolver(path);
      }

      return `@import "${normalizePath(path)}";`;
    })
    .filter((item: string) => !!item)
    .join('\n');

  smartOutputFile(options.outputPath, content);
}

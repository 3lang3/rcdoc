import { get } from 'lodash-es';
import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import { PROJECT_STYLE_DIR, PROJECT_SRC_DIR } from './constant';

type CSSLANG = 'css' | 'less' | 'scss';

async function getCssLang(mdocConfig): Promise<CSSLANG> {
  const preprocessor = get(mdocConfig, 'build.css.preprocessor', 'less');

  if (preprocessor === 'sass') {
    return 'scss';
  }

  return preprocessor;
}

export async function getCssBaseFile(userConfig) {
  const CSS_LANG = getCssLang(userConfig);
  let path = join(PROJECT_STYLE_DIR, `base.${CSS_LANG}`);

  const baseFile = get(userConfig, 'build.css.base', '');
  if (baseFile) {
    path = isAbsolute(baseFile) ? baseFile : join(PROJECT_SRC_DIR, baseFile);
  }
  if (existsSync(path)) {
    return path;
  }

  return null;
}

const IMPORT_STYLE_RE = /import\s+?(?:(?:".*?")|(?:'.*?'))[\s]*?(?:;|$|)/g;

// "import 'a.less';" => "import 'a.css';"
export async function replaceCssImport(userConfig, code: string) {
  const CSS_LANG = getCssLang(userConfig);
  return code.replace(IMPORT_STYLE_RE, (str) => str.replace(`.${CSS_LANG}`, '.css'));
}

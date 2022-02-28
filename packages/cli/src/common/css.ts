import { get } from 'lodash-es';
import { existsSync } from 'fs';
import { join, isAbsolute } from 'path';
import { PROJECT_STYLE_DIR, PROJECT_SRC_DIR } from './constant';
import context from './context';

type CSSLANG = 'css' | 'less' | 'scss';

export function getCssLang(): CSSLANG {
  const preprocessor = get(context.opts, 'build.css.preprocessor', 'less');

  if (preprocessor === 'sass') {
    return 'scss';
  }

  return preprocessor;
}

export  function getCssBaseFile() {
  const CSS_LANG = getCssLang();
  let path = join(PROJECT_STYLE_DIR, `base.${CSS_LANG}`);

  const baseFile = get(context.opts, 'build.css.base', '');
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
export async function replaceCssImport(code: string) {
  const CSS_LANG = getCssLang();
  return code.replace(IMPORT_STYLE_RE, (str) => str.replace(`.${CSS_LANG}`, '.css'));
}

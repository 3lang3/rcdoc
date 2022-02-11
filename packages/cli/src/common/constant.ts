import { get } from 'lodash-es';
import { existsSync, readFileSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, isAbsolute, join } from 'path';

export const CONFIG_FILE_NAME = 'mdoc.config.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

console.log(__dirname)

function findRootDir(dir: string): string {
  if (existsSync(join(dir, CONFIG_FILE_NAME))) {
    return dir;
  }

  const parentDir = dirname(dir);
  if (dir === parentDir) {
    return dir;
  }

  return findRootDir(parentDir);
}

// Project root paths
export const CWD = process.cwd();
export const ROOT = findRootDir(CWD);
export const PROJECT_DIST_DIR = join(ROOT, 'dist');
export const PROJECT_ES_DIR = join(PROJECT_DIST_DIR, 'es');
export const PROJECT_CJS_DIR = join(PROJECT_DIST_DIR, 'cjs');
export const PROJECT_HD_DIR = join(PROJECT_DIST_DIR, '2x');
export const PROJECT_DOCS_DIR = join(PROJECT_DIST_DIR, 'docs');
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json');
export const PROJECT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js');
export const PROJECT_CACHE_DIR = join(ROOT, 'node_modules/.cache');
export const PROJECT_SITE_DIST_DIR = join(ROOT, 'site');
export const PROJECT_CONFIG_FILE = join(ROOT, CONFIG_FILE_NAME);

// Relative paths
export const SITE_SRC_DIR = join(__dirname, '..', 'site');
export const DIST_DIR = join(__dirname, '..', 'bundle');
export const CONFIG_DIR = join(__dirname, '..', 'config');

// Dist files
export const PACKAGE_ENTRY_FILE = join(DIST_DIR, 'mdoc-package-entry.js');
export const PACKAGE_STYLE_FILE = join(DIST_DIR, 'mdoc-package-style.css');
export const SITE_SHARED_FILE = join(DIST_DIR, 'mdoc-site-shared.js');
export const STYLE_DEPS_JSON_FILE = join(DIST_DIR, 'mdoc-style-deps.json');

export const SCRIPT_EXTS = ['.js', '.jsx', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

export function getPackageJson() {
  const rawJson = readFileSync(PACKAGE_JSON_FILE, 'utf-8');
  return JSON.parse(rawJson);
}

async function getMdocConfigAsync() {
  try {
    // https://github.com/nodejs/node/issues/31710
    // absolute file paths don't work on Windows
    return (await import(pathToFileURL(PROJECT_CONFIG_FILE).href)).default;
  } catch (err) {
    return {};
  }
}

const mdocConfig = await getMdocConfigAsync();

export function getMdocConfig() {
  return mdocConfig;
}

export const PROJECT_SRC_DIR = join(ROOT, 'src');
export const PROJECT_STYLE_DIR = join(PROJECT_SRC_DIR, 'styles');

function ComponentClassification(): {
  ComponentClassificationArray: Array<string>;
  navArray: Array<any>;
} {
  const mdocConfig = getMdocConfig();
  let ComponentClassificationArray = [];
  let navArray = [];
  if (existsSync(PROJECT_CONFIG_FILE)) {
    const { nav } = mdocConfig.site.locales['zh-CN'];
    navArray = nav;
    ComponentClassificationArray = nav.map((item) => {
      return item.title;
    });
  }
  return { ComponentClassificationArray, navArray };
}

export const { ComponentClassificationArray: COMPONENT_CLASSIFICATION, navArray: nav } =
  ComponentClassification();

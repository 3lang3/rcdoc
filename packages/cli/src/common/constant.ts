import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url));

// Project root paths
export const CWD = process.cwd();
export const ROOT = CWD;
export const PROJECT_DIST_DIR = join(ROOT, 'dist');
export const PROJECT_ES_DIR = join(PROJECT_DIST_DIR, 'es');
export const PROJECT_CJS_DIR = join(PROJECT_DIST_DIR, 'cjs');
export const PROJECT_HD_DIR = join(PROJECT_DIST_DIR, '2x');
export const PROJECT_DOCS_DIR = join(ROOT, 'docs');
export const PACKAGE_JSON_FILE = join(ROOT, 'package.json');
export const PROJECT_POSTCSS_CONFIG_FILE = join(ROOT, 'postcss.config.js');
export const PROJECT_CACHE_DIR = join(ROOT, 'node_modules/.cache');
export const PROJECT_CLI_DIST_DIR = join(ROOT, '.mdoc');
export const PROJECT_SITE_DIST_DIR = join(ROOT, 'site');

// Relative paths
export const SITE_SRC_DIR = join(__dirname, '..', 'site');
export const DIST_DIR = join(__dirname, '..', '.mdoc');
export const CONFIG_DIR = join(__dirname, '..', 'config');

// Dist files
export const PACKAGE_ENTRY_FILE = join(PROJECT_CLI_DIST_DIR, 'package-entry.js');
export const PACKAGE_STYLE_FILE = join(PROJECT_CLI_DIST_DIR, 'package-style.css');
export const SITE_SHARED_FILE = join(PROJECT_CLI_DIST_DIR, 'site-shared.js');
export const SITE_SHARD_CONFIG_FILE = join(PROJECT_CLI_DIST_DIR, 'config.json');
export const STYLE_DEPS_JSON_FILE = join(PROJECT_CLI_DIST_DIR, 'style-deps.json');

// Config files
export const CJS_DIR = join(__dirname, '..', '..', 'cjs');
export const JEST_CONFIG_FILE = join(CJS_DIR, 'jest.config.cjs');

export const SCRIPT_EXTS = ['.js', '.jsx', '.ts', '.tsx'];
export const STYLE_EXTS = ['.css', '.less', '.scss'];

export function getPackageJson() {
  const rawJson = readFileSync(PACKAGE_JSON_FILE, 'utf-8');
  return JSON.parse(rawJson);
}

export const PROJECT_SRC_DIR = join(ROOT, 'src');
export const PROJECT_STYLE_DIR = join(PROJECT_SRC_DIR, 'styles');

export async function ComponentClassification(mdocConfig): Promise<{
  ComponentClassificationArray: Array<string>;
  navArray: Array<any>;
}> {
  let ComponentClassificationArray = [];
  let navArray = [];
  if (existsSync(SITE_SHARD_CONFIG_FILE)) {
    const { nav } = mdocConfig.site.locales['zh-CN'];
    navArray = nav;
    ComponentClassificationArray = nav.map((item) => {
      return item.title;
    });
  }
  return { ComponentClassificationArray, navArray };
}

import glob from 'fast-glob';
import { join, parse } from 'path';
import fse from 'fs-extra';
import {
  pascalize,
  smartOutputFile,
  normalizePath,
  replaceExt,
} from '../common';
import {
  PROJECT_SRC_DIR,
  PROJECT_DOCS_DIR,
  getPackageJson,
  SITE_SHARED_LAZY_FILE,
  SITE_SHARD_CONFIG_FILE,
  PACKAGE_STYLE_FILE,
  SITE_SHARED_MENU_FILE,
  SITE_SHARED_ROUTES_FILE,
} from '../common/constant';
import { genSiteMenu } from './gen-site-menu'
import context from '../common/context';
import { getCssLang } from '../common/css';
import { genSiteMenuShared } from './gen-site-menu-shared'
import { genSiteRoutesShared } from './gen-site-routes-shared'

const { existsSync, readdirSync } = fse;

type DocumentItem = {
  name: string;
  path: string;
};

function formatName(component: string, lang?: string) {
  component = pascalize(component);
  if (lang) {
    return `${component}_${lang.replace('-', '_')}`;
  }
  return component;
}

/**
 * i18n mode:
 *   - action-sheet/README.md       => ActionSheet_EnUS
 *   - action-sheet/README.zh-CN.md => ActionSheet_ZhCN
 *
 * default mode:
 *   - action-sheet/README.md => ActionSheet
 */
async function resolveComponentDocuments(userConfig, components: string[]): Promise<DocumentItem[]> {
  const { locales } = userConfig;
  const defaultLang = locales[0][0];

  const docs: DocumentItem[] = [];

  if (locales.length > 1) {
    const langs = locales.map(el => el[0]);

    langs.forEach((lang) => {
      const fileName = lang === defaultLang ? 'README.md' : `README.${lang}.md`;
      components.forEach((component) => {
        docs.push({
          name: formatName(component, lang),
          path: join(PROJECT_SRC_DIR, component, fileName),
        });
      });
    });
  } else {
    components.forEach((component) => {
      docs.push({
        name: formatName(component),
        path: join(PROJECT_SRC_DIR, component, 'README.md'),
      });
    });
  }

  const componentDocs = docs
    .filter((item) => existsSync(item.path))

  return componentDocs;
}

async function resolveStaticDocuments(userConfig): Promise<DocumentItem[]> {
  const { locales } = userConfig;
  const defaultLang = locales[0][0];

  const staticDocs = glob.sync(normalizePath(join(PROJECT_DOCS_DIR, '**/*.md'))).map((path) => {
    const pairs = parse(path).name.split('.');
    return {
      name: formatName(pairs[0], pairs[1] || defaultLang),
      path,
    };
  });

  return staticDocs;
}

// Import all json file
function genImportJSON() {
  return `
export { default as config} from '${normalizePath(SITE_SHARD_CONFIG_FILE)}';
export { default as menus} from '${normalizePath(SITE_SHARED_MENU_FILE)}';
  `;
}

function genExportRoutes() {
  return `
export { default as routes } from '${normalizePath(SITE_SHARED_ROUTES_FILE)}';
  `;
}

function genStyles() {
  const CSS_LANG = getCssLang();
  return `import '${replaceExt(PACKAGE_STYLE_FILE, `.${CSS_LANG}`)}'`
}

function genExportVersion() {
  const projectPackageJson = getPackageJson();
  return `export const packageVersion = '${projectPackageJson.version}';`;
}

// 导出所有.md
function genExportAllDocuments(items: DocumentItem[]) {
  return `export const documents = {
  ${items.map((item) => `${item.name}: '${normalizePath(item.path)}'`).join(',\n  ')}
};`;
}

// 导出所有组件.md
function genExportDocuments(items: DocumentItem[]) {
  return `export const componentNames = [
    ${items.map((item) => `'${item.name}'`).join(',\n  ')}
  ];`;
}


export async function genSiteDesktopSharedLazy() {
  const userConfig = context.opts
  const dirs = readdirSync(PROJECT_SRC_DIR);
  const componentDocuments = await resolveComponentDocuments(userConfig, dirs);
  const staticDocuments = await resolveStaticDocuments(userConfig);
  const documents = [...staticDocuments, ...componentDocuments];
  const { menus, flattenMenus } = genSiteMenu()
  const code = `${genImportJSON()}
${genStyles()}
${genExportAllDocuments(documents)}
${genExportDocuments(componentDocuments)}
${genExportRoutes()}
${genExportVersion()}
`;
  genSiteMenuShared(menus);
  genSiteRoutesShared(flattenMenus);
  smartOutputFile(SITE_SHARED_LAZY_FILE, code);
}

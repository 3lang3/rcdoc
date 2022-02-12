import glob from 'fast-glob';
import { join, parse } from 'path';
import fse from 'fs-extra';
import {
  pascalize,
  removeExt,
  getMdocConfig,
  smartOutputFile,
  normalizePath,
} from '../common';
import {
  PROJECT_SRC_DIR,
  PROJECT_DOCS_DIR,
  getPackageJson,
  PROJECT_CONFIG_FILE,
  SITE_SHARED_FILE,
} from '../common/constant';

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
async function resolveComponentDocuments(components: string[]): Promise<DocumentItem[]> {
  const projectPackageJson = getPackageJson();
  const vantConfig = await getMdocConfig();
  console.log(vantConfig)
  const { locales, defaultLang } = vantConfig.site;

  const docs: DocumentItem[] = [];

  if (locales) {
    const langs = Object.keys(locales);
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
    .map((el) => ({ ...el, path: el.path.replace(PROJECT_SRC_DIR, projectPackageJson.name) }));

  return componentDocs;
}

async function resolveStaticDocuments(): Promise<DocumentItem[]> {
  const vantConfig = await getMdocConfig();
  const { defaultLang } = vantConfig.site;

  const staticDocs = glob.sync(normalizePath(join(PROJECT_DOCS_DIR, '**/*.md'))).map((path) => {
    const pairs = parse(path).name.split('.');
    return {
      name: formatName(pairs[0], pairs[1] || defaultLang),
      path,
    };
  });

  // const docs = staticDocs.filter((item) => existsSync(item.path)).map(el => ({ ...el, path: el.path.replace(DOCS_DIR, projectPackageJson.name) }))

  return staticDocs;
}

// config.js
function genImportConfig() {
  return `import config from '${removeExt(normalizePath(PROJECT_CONFIG_FILE))}';`;
}

function genExportConfig() {
  return 'export { config };';
}

function genExportVersion() {
  const projectPackageJson = getPackageJson();
  return `export const packageVersion = '${projectPackageJson.version}';`;
}

// 引入所有.md
// ps: 这里需要使用 loader 转译 markdown
function genImportDocuments(items: DocumentItem[]) {
  return items
    .map((item) => `import * as ${item.name} from '${normalizePath(item.path)}';`)
    .join('\n');
}

// 导出所有.md
function genExportAllDocuments(items: DocumentItem[]) {
  return `export const documents = {
  ${items.map((item) => item.name).join(',\n  ')}
};`;
}

// 导出所有组件.md
function genExportDocuments(items: DocumentItem[]) {
  return `export const componentNames = [
    ${items.map((item) => `'${item.name}'`).join(',\n  ')}
  ];`;
}

export async function genSiteDesktopShared() {
  const dirs = readdirSync(PROJECT_SRC_DIR);
  const componentDocuments = await resolveComponentDocuments(dirs);
  const staticDocuments = await resolveStaticDocuments();
  const documents = [...staticDocuments, ...componentDocuments];
  const code = `${genImportConfig()}
${genImportDocuments(documents)}
${genExportConfig()}
${genExportAllDocuments(documents)}
${genExportDocuments(componentDocuments)}
${genExportVersion()}
`;
  smartOutputFile(SITE_SHARED_FILE, code);
}

import glob from 'fast-glob';
import path from 'path';
import fse from 'fs-extra';
import { capitalize, kebabCase } from 'lodash-es'
import {
  PROJECT_SRC_DIR,
} from '../common/constant';

const { existsSync, readdirSync } = fse;

type NavItem = {
  title: string;
  path?: string;
  route?: string;
  filePath?: string;
  lang?: string;
};

function resolveComponentNavs(userConfig, components: string[]): NavItem[] {
  const { locales } = userConfig;
  const defaultLang = locales[0][0];
  const navs: NavItem[] = [];
  const langs = locales.map(el => el[0]);

  langs.forEach((lang) => {
    const isDefaultLang = lang === defaultLang
    const fileName = isDefaultLang ? 'README.md' : `README.${lang}.md`;
    components.forEach((component) => {
      const mdfilePath = path.join(PROJECT_SRC_DIR, component, fileName)
      if (existsSync(mdfilePath)) {
        navs.push({
          title: capitalize(component),
          path: path.join(isDefaultLang ? '' : lang, component),
          lang
        });
      }
    });
  });


  return navs;
}

function resolveStaticNavs(): NavItem[] {
  const staticDocs = glob.sync(path.normalize(path.join(PROJECT_SRC_DIR, '**/*.md'))).map((filePath) => {
    const { name, dir } = path.parse(filePath);
    const isBaseDir = dir === PROJECT_SRC_DIR;
    const baseDir = path.join('/', path.relative(PROJECT_SRC_DIR, dir))
    let [title, lang = 'default'] = name.split('.');
    const isDefaultFile = title === 'README';
    const route = path.join(baseDir, isDefaultFile ? '' : kebabCase(title))

    if (isDefaultFile && !isBaseDir) {
      // 目录默认路径 title往上取一级
      // /src/button/README.md
      // button ✅ README ❌
      title = path.basename(dir)
    }
    return {
      title,
      lang,
      route,
      filePath,
    };
  });
  return staticDocs;
}

export function genSiteNavShared(userConfig) {
  const dirs = readdirSync(PROJECT_SRC_DIR);
  const componentNavs = resolveComponentNavs(userConfig, dirs);
  const staticNavs = resolveStaticNavs();
  console.log(staticNavs)
  const navs = [...componentNavs];
  return navs
}

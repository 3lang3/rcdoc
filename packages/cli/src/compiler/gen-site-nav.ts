import glob from 'fast-glob';
import { join, parse } from 'path';
import fse from 'fs-extra';
import {
  pascalize,
  normalizePath,
} from '../common';
import {
  PROJECT_SRC_DIR,
  PROJECT_DOCS_DIR,
} from '../common/constant';

const { existsSync, readdirSync } = fse;

type NavItem = {
  title: string;
  path: string;
};

function resolveComponentNavs(userConfig, components: string[]): NavItem[] {
  const { locales } = userConfig;
  const defaultLang = locales[0][0];

  const navs: NavItem[] = [];

  if (locales.length > 1) {
    const langs = locales.map(el => el[0]);
    langs.forEach((lang) => {
      const isDefaultLang = lang === defaultLang
      const fileName = isDefaultLang ? 'README.md' : `README.${lang}.md`;
      components.forEach((component) => {
        const mdfilePath = join(PROJECT_SRC_DIR, component, fileName)
        if (existsSync(mdfilePath)) {
          navs.push({
            title: pascalize(component),
            path: join(isDefaultLang ? '' : lang, component),
          });
        }
      });
    });
  } else {
    components.forEach((component) => {
      const mdfilePath = join(PROJECT_SRC_DIR, component, 'README.md')
      if (existsSync(mdfilePath)) {
        navs.push({
          title: pascalize(component),
          path: component,
        });
      }
    });
  }

  return navs;
}

function resolveStaticNavs(): NavItem[] {
  const staticDocs = glob.sync(normalizePath(join(PROJECT_DOCS_DIR, '**/*.md'))).map((path) => {
    const pairs = parse(path).name.split('.');
    return {
      title: pairs[0],
      path,
    };
  });

  return staticDocs;
}

export function genSiteNavShared(userConfig) {
  const dirs = readdirSync(PROJECT_SRC_DIR);
  const componentNavs = resolveComponentNavs(userConfig, dirs);
  const staticNavs = resolveStaticNavs();
  const navs = [...staticNavs, ...componentNavs];
  return navs
}

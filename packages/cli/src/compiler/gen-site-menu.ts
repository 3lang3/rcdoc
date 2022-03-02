import glob from 'fast-glob';
import path from 'path';
import { kebabCase } from 'lodash-es'
import {
  PROJECT_SRC_DIR,
  PROJECT_CLI_DIST_DIR
} from '../common/constant';
import context from '../common/context';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown';

type MenuItem = {
  title: string;
  path?: string;
  isLink?: boolean;
  children?: Array<MenuItem>;
};

type NavItem = {
  filePath?: string;
  relative?: string;
  lang?: string;
  level?: number;
  component?: any;
  children?: Array<NavItem>;
} & MenuItem;

function resolveStaticNavs(userConfig): NavItem[] {
  const { locales } = userConfig;
  const defaultLang = locales[0][0];

  const staticDocs = glob.sync(path.normalize(path.join(PROJECT_SRC_DIR, '**/*.md'))).map((filePath) => {
    const { dir } = path.parse(filePath);
    let { title, lang = defaultLang } = getTitleAndLangByFilepath(filePath);
    const { headings, frontmatter } = getMarkdownContentMeta(filePath)
    const isBaseDir = dir === PROJECT_SRC_DIR;
    const baseDir = path.join('/', path.relative(PROJECT_SRC_DIR, dir))
    const defaultLangFile = title === 'README';
    const routePath = path.join(baseDir, defaultLangFile ? '' : kebabCase(title));
    const level = routePath.split(path.sep).length - 1;
    const relative = path.relative(PROJECT_CLI_DIST_DIR, filePath);
    // Lazy load for reduce bundle
    const component = `React.lazy(() => import(/* @vite-ignore */'${relative}'))`

    // Default is link type
    let isLink = true
    if (frontmatter?.link === false) {
      isLink = false
    }
    if (defaultLangFile && !isBaseDir) {
      // If is default lang path, title get basename value
      // /src/button/README.md
      // button ✅ README ❌
      title = path.basename(dir)
    }
    // Overwrite title
    title = frontmatter?.title || headings?.[0] || title
    return {
      title,
      lang,
      level,
      relative,
      path: routePath,
      filePath,
      isLink,
      component,
    };
  });
  return staticDocs;
}

export function genSiteMenu() {
  const routes = resolveStaticNavs(context.opts);
  localesCompatibleRoute(routes, context.opts?.locales);
  const menuRoutes = routes.map(({ lang, title, path, level, isLink }) => ({ lang, title, path, level, isLink }))
  return { routes, menus: generateMenus(menuRoutes) }
}

// For missing translation 
// Use the documents in the default language as the untranslated language documents
function localesCompatibleRoute(allRoutes: NavItem[], locales: [string, string]) {
  const defaultLang = locales[0][0]
  const defaultLangRoutes = allRoutes.filter(r => r.lang === defaultLang);
  const othersLangRoutes = allRoutes.reduce((a, v) => {
    if (v.lang !== defaultLang) {
      if (!a[v.lang]) {
        a[v.lang] = [v]
      } else {
        a[v.lang].push(v)
      }
    }
    return a
  }, {});

  Object.entries(othersLangRoutes).forEach(([lang, routes]: [string, any[]]) => {
    defaultLangRoutes.forEach((defaultRoute) => {
      if (!routes.find(r => r.path === defaultRoute.path)) {
        const idx = allRoutes.findIndex(r => r.path === defaultRoute.path)
        allRoutes.splice(idx, 0, { ...defaultRoute, lang })
      }
    })
  })
}

// get langs arr by locales
function getLangs(data: NavItem[]) {
  return data.reduce<string[]>((a, v) => {
    if (!a.includes(v.lang)) a.push(v.lang);
    return a;
  }, [])
}


function getRoutesDataByLang(data, lang) {
  let flattenRoutes = data.filter(r => r.lang === lang);

  let level = 1;
  let arr: NavItem[] = [];

  function makeupRoutesByLevel() {
    while (flattenRoutes.length) {
      const levelRoutes = flattenRoutes.filter(r => r.level === level)
      flattenRoutes = flattenRoutes.filter(el => el.level !== level)
      if (level === 1) {
        arr = arr.concat(levelRoutes);
        level++
        continue;
      }
      for (const route of levelRoutes) {
        appendRoute(arr, route)
      }
      level++;
    }
  }

  function appendRoute(children, el: NavItem) {
    const target = findParentRoute(children, path.dirname(el.path))
    if (target) {
      if (target.children) {
        target.children.push(el)
      } else {
        target.children = [el]
      }
    } else {
      children.push(el)
    }
  }

  function findParentRoute(children: NavItem[], parentPath: string) {
    let parent;
    children.some(cld => {
      if (cld.path === parentPath) {
        parent = cld
        return true
      }
      if (cld.children && cld.children.length) {
        parent = findParentRoute(cld.children, parentPath)
      }
    })
    return parent
  }

  makeupRoutesByLevel()
  return arr;
}

function generateMenus(data: NavItem[]) {
  const cloneData = JSON.parse(JSON.stringify(data))
  const filterData = cloneData
  const langs = getLangs(filterData);
  const langsRoutes = langs.reduce((a, v) => {
    a[v] = getRoutesDataByLang(filterData, v)
    return a;
  }, {});
  return langsRoutes
}
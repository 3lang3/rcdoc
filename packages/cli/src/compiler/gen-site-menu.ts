import glob from 'fast-glob';
import path from 'path';
import { kebabCase } from 'lodash-es'
import {
  PROJECT_SRC_DIR,
  PROJECT_DOCS_DIR,
  PROJECT_CLI_DIST_DIR
} from '../common/constant';
import context from '../common/context';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown';

type MenuItem = {
  redirect?: string;
  title?: string;
  path?: string;
  langPath?: string;
  isLink?: boolean;
  children?: Array<MenuItem>;
  group?: {
    title: string;
  }
};

type NavItem = {
  filePath?: string;
  isComponentDir?: boolean;
  relative?: string;
  lang?: string;
  component?: any;
  children?: Array<NavItem>;
} & MenuItem;

function getMenuDataByFilepath(root: string, filePath: string, defaultLang: string) {
  const { dir } = path.parse(filePath);
  let { title, lang = defaultLang } = getTitleAndLangByFilepath(filePath);
  const { headings, frontmatter } = getMarkdownContentMeta(filePath)
  const isBaseDir = dir === root;
  const baseDir = path.join('/', path.relative(root, dir))
  const defaultLangFile = title === 'README';
  const routePath = path.join(baseDir, defaultLangFile ? '' : kebabCase(title));
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
  title = frontmatter?.title || headings?.[0] || title;

  let menu: NavItem = {
    title,
    lang,
    relative,
    path: routePath,
    langPath: lang !== defaultLang ? path.join('/', lang, routePath) : routePath,
    filePath,
    isLink,
    component,
  }

  if (frontmatter?.group) {
    menu.group = frontmatter?.group
  }

  return menu;
}

function resolveStaticMenus(userConfig): Record<string, NavItem[]> {
  const { locales } = userConfig;
  const defaultLang = !locales ? '' : locales[0][0];

  const docsMenus = glob.sync(path.normalize(path.join(PROJECT_DOCS_DIR, '**/*.md'))).map((filePath) => {
    const menu = getMenuDataByFilepath(PROJECT_DOCS_DIR, filePath, defaultLang);
    if (!locales && menu.lang) return false;
    if (locales && !locales.some(l => l[0] === menu.lang)) return false
    return menu;
  }).filter(Boolean) as NavItem[];

  const componentMenus = glob.sync(path.normalize(path.join(PROJECT_SRC_DIR, '**/*.md'))).map((filePath) => {
    const menu = getMenuDataByFilepath(PROJECT_SRC_DIR, filePath, defaultLang);

    if (!locales && menu.lang) return false;
    if (locales && !locales.some(l => l[0] === menu.lang)) return false;
    return { ...menu, isComponentDir: true };
  }).filter(Boolean) as NavItem[];
  return { docsMenus, componentMenus }
}

export function genSiteMenu() {
  const { docsMenus, componentMenus } = resolveStaticMenus(context.opts);

  const { locales, menus: configMenus } = context.opts

  const langs = !locales ? false : locales.map(el => el[0]);
  const defaultLang = !locales ? '' : langs[0]

  // Comsumer config menu
  if (configMenus) {
    let loopIdx = 0;
    Object.entries(configMenus).forEach(([cfgMenuPath, cfgMenuCld]) => {
      let pathLang = Array.isArray(langs) ? langs.find(lang => cfgMenuPath.startsWith('/' + lang)) || defaultLang : defaultLang;
      cfgMenuCld.forEach((menuItem) => {
        menuItem.children?.forEach((cPath, idx) => {
          // Get target component menu item
          const targetMenuIdx = componentMenus.findIndex(
            el => el.lang === pathLang
              // If not default lang path need add lang to compare
              && path.join(pathLang !== defaultLang ? '/' + el.lang : '', el.path) === cPath
          );
          if (targetMenuIdx === -1) return;
          const targetMenu = componentMenus[targetMenuIdx];
          // Replace menu frontmatter.group data
          if (targetMenu && idx === 0) {
            targetMenu.group = { title: menuItem.title };
          }
          // Recompute menu position
          const correctIdx = idx + loopIdx;
          if (correctIdx !== targetMenuIdx) {
            ;[componentMenus[correctIdx], componentMenus[targetMenuIdx]] = [componentMenus[targetMenuIdx], componentMenus[correctIdx]];
          }
        })
        loopIdx += menuItem.children?.length
      })
    })
  }

  const mergeMenus = [...docsMenus, ...componentMenus];

  if (Array.isArray(locales)) {
    // Compatile missing translation 
    localesCompatibleRoute(mergeMenus, locales, defaultLang);
  }

  // Filter menu property
  const menuRoutes = mergeMenus.map(({ isComponentDir, lang, title, path, langPath, isLink, filePath, group }) => ({ lang, isComponentDir, title, path, langPath, isLink, filePath, group }))

  const { allRedirectRoutes, langsMenus } = generateMenus(menuRoutes);

  return { routes: [...mergeMenus, ...allRedirectRoutes], menus: langsMenus }
}

// For missing translation 
// Use the documents in the default language as the untranslated language documents
function localesCompatibleRoute(allRoutes: NavItem[], locales: [string, string][], defaultLang: string) {
  const defaultLangRoutes = allRoutes.filter(r => r.lang === defaultLang);
  const otherLang = locales[1][0]
  const othersLangRoutes = allRoutes.reduce((a, v) => {
    if (v.lang === otherLang) {
      if (!a[v.lang]) {
        a[v.lang] = [v]
      } else {
        a[v.lang].push(v)
      }
    }
    return a
  }, {});

  // Correct compatitly route lang & langpath
  Object.entries(othersLangRoutes).forEach(([lang, routes]: [string, any[]]) => {
    defaultLangRoutes.forEach((defaultRoute) => {
      if (!routes.find(r => r.path === defaultRoute.path)) {
        const idx = allRoutes.findIndex(r => r.path === defaultRoute.path)
        allRoutes.splice(idx, 0, { ...defaultRoute, lang, langPath: lang !== defaultLang ? path.join('/', lang, defaultRoute.path) : defaultRoute.path })
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


function getRoutesDataByLang(data) {
  const redirectRoutes = []
  function searchParent(children: NavItem[], parentPath: string) {
    let parent;
    children.some(cld => {
      if (cld.path === parentPath && parentPath !== '/') {
        parent = cld
        return true
      }
      if (cld.children && cld.children.length) {
        parent = searchParent(cld.children, parentPath)
      }
    })
    return parent
  }

  const routes = data.reduce((a, v) => {
    const dirname = path.dirname(v.path)
    const target = searchParent(a, dirname)
    if (target) {
      if (target.children) {
        target.children.push(v)
      } else {
        target.children = [v]
      }
    } else {
      if (dirname !== '/') {
        a.push({ path: dirname, children: [v], isComponentDir: v.isComponentDir })
        redirectRoutes.push({ redirect: v.langPath, path: path.dirname(v.langPath) })
      }
    }
    return a;
  }, [])

  return [routes, redirectRoutes]
}

function generateMenus(data: NavItem[]) {
  const cloneData = JSON.parse(JSON.stringify(data)) as NavItem[];
  const allRedirectRoutes = []
  const langs = getLangs(cloneData);
  const langsMenus = langs.reduce((a, v) => {
    const flattenRoutes = data.filter(r => r.lang === v);
    const [routes, redirectRoutes] = getRoutesDataByLang(flattenRoutes)
    a[v] = routes;
    allRedirectRoutes.push(...redirectRoutes)
    return a;
  }, {});

  return { allRedirectRoutes, langsMenus }
}


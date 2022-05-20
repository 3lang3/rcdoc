import glob from 'fast-glob';
import path from 'path';
import slash from 'slash2';
import { kebabCase } from 'lodash-es';
import { CWD, PROJECT_CLI_DIST_DIR, ROOT } from '../common/constant';
import context from '../common/context';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown';

export type MenuItem = {
  redirect?: string;
  title?: string;
  path?: string;
  langPath?: string;
  isLink?: boolean;
  children?: Array<MenuItem>;
  headings?: any;
  relative?: string;
  lang?: string;
  filePath?: string;
  component?: any;
  group?: {
    title: string;
  };
};

type NavItem = {
  children?: Array<NavItem>;
} & MenuItem;

function getMenuDataByFilepath(includes: string[], filePath: string, defaultLang: string) {
  const root = includes.find((p) => filePath.startsWith(path.join(ROOT, p)));
  const rootPath = path.join(ROOT, root);
  const { dir } = path.parse(filePath);
  let { title, lang = defaultLang } = getTitleAndLangByFilepath(filePath);
  const { headings, frontmatter } = getMarkdownContentMeta(filePath);
  const isBaseDir = dir === rootPath;
  const baseDir = path.join('/', path.relative(rootPath, dir));
  const defaultLangFile = title === 'README';
  const routePath = path.join(baseDir, defaultLangFile ? '' : kebabCase(title));
  const relative = slash(path.relative(PROJECT_CLI_DIST_DIR, filePath));
  // Lazy load for reduce bundle
  const component = `React.lazy(() => import(/* @vite-ignore */'${relative}'))`;

  // Default is link type
  let isLink = true;
  if (frontmatter?.link === false) {
    isLink = false;
  }
  if (defaultLangFile && !isBaseDir) {
    // If is default lang path, title get basename value
    // /src/button/README.md
    // button ✅ README ❌
    title = path.basename(dir);
  }
  // Overwrite title
  title = frontmatter?.title || headings?.[0] || title || '';

  let menu: MenuItem = {
    title: title.replace(/[\r\n]/g, ''),
    lang,
    relative,
    path: slash(routePath),
    langPath: slash(lang !== defaultLang ? path.join('/', lang, routePath) : routePath),
    filePath: slash(filePath),
    isLink,
    component,
  };

  if (frontmatter?.group) {
    menu.group = frontmatter?.group;
  }

  return menu;
}

function resolveStaticMenus(userConfig): NavItem[] {
  const { locales, resolve } = userConfig;
  const defaultLang = !locales ? '' : locales[0][0];

  const menus = glob
    .sync(
      resolve.includes.map((dirPath: string) => slash(path.join(dirPath, '**/*.md'))),
      { ignore: (resolve.excludes = []) },
    )
    .map((filePath) => {
      const menu = getMenuDataByFilepath(resolve.includes, path.join(CWD, filePath), defaultLang);
      if (!locales && menu.lang) return false;
      if (locales && !locales.some((l) => l[0] === menu.lang)) return false;
      return menu;
    })
    .filter(Boolean) as NavItem[];
  return menus;
}

export function genSiteMenu() {
  const menus = resolveStaticMenus(context.opts);
  const { locales, menus: configMenus, navs = [] } = context.opts;

  const hasNavs = !!navs.length;
  const langs = !locales ? false : locales.map((el) => el[0]);
  const defaultLang = !locales ? '' : langs[0];

  // Comsumer config menu
  if (configMenus) {
    let loopIdx = 0;
    Object.entries(configMenus).forEach(([cfgMenuPath, cfgMenuCld]) => {
      let pathLang = Array.isArray(langs)
        ? langs.find((lang) => cfgMenuPath.startsWith('/' + lang)) || defaultLang
        : defaultLang;
      cfgMenuCld.forEach((menuItem) => {
        menuItem.children?.forEach((cPath, idx) => {
          // Get target component menu item
          const targetMenuIdx = menus.findIndex(
            (el) =>
              el.lang === pathLang &&
              // If not default lang path need add lang to compare
              slash(path.join(pathLang !== defaultLang ? '/' + el.lang : '', el.path)) === cPath,
          );
          if (targetMenuIdx === -1) return;
          const targetMenu = menus[targetMenuIdx];
          // Replace menu frontmatter.group data
          if (targetMenu && idx === 0) {
            targetMenu.group = { title: menuItem.title };
          }
          // Recompute menu position
          const correctIdx = idx + loopIdx;
          if (correctIdx !== targetMenuIdx) {
            [menus[correctIdx], menus[targetMenuIdx]] = [menus[targetMenuIdx], menus[correctIdx]];
          }
        });
        loopIdx += menuItem.children?.length;
      });
    });
  }

  const mergeMenus = [...menus];

  if (Array.isArray(locales)) {
    // Compatile missing translation
    localesCompatibleRoute(mergeMenus, locales, defaultLang);
  }

  // Filter menu property
  const menuRoutes = mergeMenus.map(({ lang, title, path, langPath, isLink, filePath, group }) => ({
    lang,
    title,
    path,
    langPath,
    isLink,
    filePath,
    group,
  }));

  const { allRedirectRoutes, langsMenus } = generateMenus(menuRoutes, langs || [''], hasNavs);

  return { routes: [...mergeMenus, ...allRedirectRoutes], menus: langsMenus };
}

// For missing translation
// Use the documents in the default language as the untranslated language documents
function localesCompatibleRoute(
  allRoutes: NavItem[],
  locales: [string, string][],
  defaultLang: string,
) {
  const defaultLangRoutes = allRoutes.filter((r) => r.lang === defaultLang);
  const otherLang = locales[1][0];
  const othersLangRoutes = allRoutes.reduce(
    (a, v) => {
      if (v.lang === otherLang) {
        if (!a[v.lang]) {
          a[v.lang] = [v];
        } else {
          a[v.lang].push(v);
        }
      }
      return a;
    },
    { [otherLang]: [] },
  );

  // Correct compatitly route lang & langpath
  Object.entries(othersLangRoutes).forEach(([lang, routes]: [string, any[]]) => {
    defaultLangRoutes.forEach((defaultRoute) => {
      if (!routes.find((r) => r.path === defaultRoute.path)) {
        const idx = allRoutes.findIndex((r) => r.path === defaultRoute.path);
        allRoutes.splice(idx, 0, {
          ...defaultRoute,
          lang,
          langPath:
            lang !== defaultLang ? path.join('/', lang, defaultRoute.path) : defaultRoute.path,
        });
      }
    });
  });
}

function getRoutesDataByLang(data: NavItem[], hasNavs?: boolean) {
  const redirectRoutes = [];

  function searchParent(children: NavItem[], parentPath: string) {
    let parent;
    children.some((cld) => {
      if (cld.path === parentPath && parentPath !== '/') {
        parent = cld;
        return true;
      }
      if (cld.children && cld.children.length) {
        parent = searchParent(cld.children, parentPath);
      }
    });
    return parent;
  }

  const routes = data.reduce((a, v) => {
    const dirname = path.dirname(v.path);
    const target = searchParent(a, dirname);

    if (target) {
      if (target.children) {
        target.children.push(v);
      } else {
        target.children = [v];
      }
      return a;
    }
    if (v.path !== '/') {
      a.push({ path: dirname, children: [v] });
      redirectRoutes.push({ redirect: v.langPath, path: path.dirname(v.langPath) });
    } else {
      if (!hasNavs) a.push(v);
    }
    return a;
  }, []);

  return [routes, redirectRoutes];
}

function generateMenus(data: NavItem[], langs: string[], hasNavs?: boolean) {
  const allRedirectRoutes = [];
  const langsMenus = langs.reduce((a, v) => {
    const flattenRoutes = data.filter((r) => r.lang === v);
    const [routes, redirectRoutes] = getRoutesDataByLang(flattenRoutes, hasNavs);
    a[v] = routes;
    allRedirectRoutes.push(...redirectRoutes);
    return a;
  }, {});

  return { allRedirectRoutes, langsMenus };
}

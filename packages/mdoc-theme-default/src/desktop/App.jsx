import React, { useMemo, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MdocSiteContext } from '@mdoc/theme';
import Doc from './components/index';
import initRoutes, { getLangFromRoute } from './routes';
import './index.less';

function getMenuByPathname(menu, pathname, isDefaultLang) {
  const paths = pathname.substr(1).split('/');
  const parentPath = '/' + paths[isDefaultLang ? 0 : 1];
  return menu.filter(el => el.path.startsWith(parentPath));
}

const App = () => {
  const { pathname } = useLocation();

  const {
    config,
    packageVersion,
    routes: _routes,
    menus: _menus,
  } = React.useContext(MdocSiteContext);

  const defaultLang = useMemo(() => {
    const { locales } = config;
    return locales[0][0];
  }, [config.locales]);

  const lang = useMemo(() => {
    const { locales } = config;
    return getLangFromRoute(pathname, locales);
  }, [config.locales, pathname]);

  const currentLangMenus = useMemo(() => _menus[lang], [lang, _menus]);

  const menus = useMemo(() => {
    if (!config.navs) {
      return currentLangMenus;
    }
    if (pathname === '/') return [];
    return getMenuByPathname(currentLangMenus, pathname, lang === defaultLang);
  }, [currentLangMenus, config.navs, pathname]);

  const routes = useMemo(() => {
    return initRoutes({ config, unprocessedRoutes: _routes });
  }, [config, _routes]);

  const currentCompnentName = useMemo(
    () => pathname.replace(/\/.*\//, ''),
    [pathname],
  );

  // 文档语言数据
  const langConfigs = React.useMemo(() => {
    const { locales = [] } = config;
    return locales.map(locale => ({
      lang: locale[0],
      label: locale[1],
    }));
  }, []);

  const currentNav = useMemo(
    () => menus.find(item => item.path === currentCompnentName),
    [menus, currentCompnentName],
  );

  // 更新标题
  const setTitle = useCallback(() => {
    let { title } = config;

    if (currentNav && currentNav.title) {
      title = `${currentNav.title} - ${title}`;
    } else if (config.description) {
      title += ` - ${config.description}`;
    }

    document.title = title;
  }, [config, currentNav]);

  useEffect(setTitle);

  // 文档版本数据
  const versions = React.useMemo(() => {
    if (config.site.versions) {
      return config.site.versions;
    }
    return [{ label: packageVersion }];
  }, []);

  // console.log(menus);

  return (
    <Doc
      lang={lang}
      defaultLang={defaultLang}
      config={config}
      menus={menus}
      langConfigs={langConfigs}
      versions={versions}
      currentCompnentName={currentCompnentName}
    >
      <Routes>
        {routes.map(route =>
          route.redirect ? (
            <Route
              key={route.path}
              path={route.path}
              element={<Navigate to={route.redirect} />}
            />
          ) : (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ),
        )}
      </Routes>
    </Doc>
  );
};

export default App;

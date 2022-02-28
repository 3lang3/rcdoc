import React, { useMemo, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { MdocSiteContext } from '@mdoc/theme';
import Doc from './components/index';
import initRoutes, { getLangFromRoute } from './routes';
import './index.less';

const App = () => {
  const { pathname } = useLocation();

  const {
    config,
    packageVersion,
    flattenMenus,
    navs: allMenus,
  } = React.useContext(MdocSiteContext);

  const defaultLang = useMemo(() => {
    const { locales } = config;
    return locales[0][0];
  }, [config.locales])

  const lang = useMemo(() => {
    const { locales } = config;
    return getLangFromRoute(pathname, locales);
  }, [config.locales, pathname]);

  const navs = useMemo(() => allMenus[lang], [lang, allMenus]);

  const routes = useMemo(() => {
    return initRoutes({ config, menus: flattenMenus });
  }, [config, flattenMenus]);

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
    () => navs.find(item => item.path === currentCompnentName),
    [navs, currentCompnentName],
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

  return (
    <Doc
      lang={lang}
      defaultLang={defaultLang}
      config={config}
      navs={navs}
      langConfigs={langConfigs}
      versions={versions}
      currentCompnentName={currentCompnentName}
    >
      <Routes>
        {routes.map(route =>
          route.redirect ? (
            <Route key={route.path} element={<Navigate to={route.redirect} />} />
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

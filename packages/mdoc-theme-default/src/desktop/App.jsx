import React, { useMemo, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
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

  const lang = useMemo(() => {
    const { locales } = config;
    return getLangFromRoute(pathname, locales);
  }, [config.locales, pathname]);

  const navs = useMemo(
    () => allMenus[lang],
    [lang, allMenus],
  );

  const routes = useMemo(() => {
    return initRoutes({ config, menus: flattenMenus })
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
      config={config}
      navs={navs}
      langConfigs={langConfigs}
      versions={versions}
      currentCompnentName={currentCompnentName}
    >
      <React.Suspense fallback={<div>loading</div>}>
        <Switch>
          {routes.map(route =>
            route.redirect ? (
              <Redirect key={route.path} to={route.redirect(pathname)} />
            ) : (
              <Route
                key={route.path}
                exact={true}
                path={route.path}
                render={props => (
                  <route.component {...props} routes={route.routes} />
                )}
              />
            ),
          )}
        </Switch>
      </React.Suspense>
    </Doc>
  );
};

export default App;

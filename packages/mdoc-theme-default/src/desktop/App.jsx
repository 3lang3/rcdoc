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
    documents,
    navs: allNavs,
  } = React.useContext(MdocSiteContext);

  const lang = useMemo(() => {
    const { locales } = config;
    return getLangFromRoute(pathname, locales);
  }, [config.locales, pathname]);

  const navs = useMemo(
    () => allNavs.filter(n => n.lang === lang),
    [lang, allNavs],
  );

  const routes = useMemo(() => {
    const allRoutes = initRoutes({ config, documents });
    return allRoutes.filter(r => r.state.lang === lang);
  }, [lang, config, documents]);

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
      <Switch>
        {routes.map(route =>
          route.redirect ? (
            <Redirect key={route.path} to={route.redirect(pathname)} />
          ) : (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              render={props => (
                <route.component {...props} routes={route.routes} />
              )}
            />
          ),
        )}
      </Switch>
    </Doc>
  );
};

export default App;

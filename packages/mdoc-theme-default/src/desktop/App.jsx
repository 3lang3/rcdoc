import React, { useMemo, useCallback, useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { config, packageVersion } from 'site-shared';

import Doc from './components/index';
import routes, { getLangFromRoute } from './routes';

import './index.less';

const App = () => {
  const { pathname } = useLocation();
  const lang = useMemo(() => {
    return getLangFromRoute(pathname);
  }, [pathname]);

  const currentCompnentName = useMemo(
    () => pathname.replace(/\/.*\//, ''),
    [pathname],
  );

  const localeConfig = useMemo(() => {
    const { locales } = config.site;
    if (locales) {
      return locales[lang];
    }
    return config.site;
  }, [lang]);

  // 文档语言数据
  const langConfigs = React.useMemo(() => {
    const { locales = {} } = config.site;
    return Object.keys(locales).map(key => ({
      lang: key,
      label: locales[key].langLabel || '',
    }));
  }, []);

  const navItems = useMemo(() => {
    return localeConfig.nav.reduce(
      (result, nav) => [...result, ...nav.items],
      [],
    );
  }, [localeConfig.nav]);

  const currentNav = useMemo(
    () => navItems.find(item => item.path === currentCompnentName),
    [navItems, currentCompnentName],
  );

  // 更新标题
  const setTitle = useCallback(() => {
    let { title } = localeConfig;

    if (currentNav && currentNav.title) {
      title = `${currentNav.title} - ${title}`;
    } else if (localeConfig.description) {
      title += ` - ${localeConfig.description}`;
    }

    document.title = title;
  }, [localeConfig, currentNav]);

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
      config={localeConfig}
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

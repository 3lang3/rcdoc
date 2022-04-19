import React from 'react';
import { SimulatorRouteComponent } from '../../components/Simulator/RouteComponent';

function initDemoRoutes({ config, unprocessedRoutes }) {
  const { locales, site = {} } = config;
  const defaultLang = !locales ? '' : locales[0][0];
  const { include = [], compact } = site?.themeConfig?.simulator || {};
  const routes = [];

  unprocessedRoutes
    .filter((route) => route.path && include.some((i) => route.path.includes(i)))
    .forEach((route) => {
      const { lang, title, path, redirect } = route;
      if (redirect) {
        routes.push({ path, redirect });
        return;
      }
      const isDefaultLang = lang === defaultLang;

      routes.push({
        title: title,
        name: `/~demo/${lang}${path}`,
        path: isDefaultLang ? `/~demo${path}` : `/~demo/${lang}${path}`,
        component: (
          <SimulatorRouteComponent
            title={title}
            simulatorCompact={compact}
            lazyComponent={route.component}
          />
        ),
        state: {
          lang,
          name: path,
        },
      });
    });

  return routes;
}

export default initDemoRoutes;

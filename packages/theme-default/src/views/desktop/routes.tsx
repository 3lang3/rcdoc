import React from 'react';
import { RouteComponent } from '../../components/MdContent/RouteComponent';

function initRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = !locales ? '' : locales[0][0];
  const routes = [];

  unprocessedRoutes.forEach((route) => {
    const { lang, title, path, redirect } = route;
    if (redirect) {
      routes.push({ path, redirect });
      return;
    }
    const isDefaultLang = lang === defaultLang;
    routes.push({
      title: title,
      name: `${lang}/${path}`,
      path: isDefaultLang ? `${path}` : `/${lang}${path}`,
      component: <RouteComponent lazyComponent={route.component} />,
      state: {
        lang,
        name: path,
      },
    });
  });

  return routes;
}

export default initRoutes;

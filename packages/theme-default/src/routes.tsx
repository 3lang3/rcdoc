import React from 'react';
import { RouteComponent } from './components/MdContent/RouteComponent';

function initRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = !locales ? '' : locales[0][0];
  const routes = [];

  unprocessedRoutes.forEach((route) => {
    const { lang, title, path, redirect, isComponentDir } = route;
    if (redirect) {
      routes.push({ path, redirect });
      return;
    }
    const isDefaultLang = lang === defaultLang;
    routes.push({
      title: title,
      name: `${lang}/${path}`,
      path: isDefaultLang ? `${path}` : `/${lang}${path}`,
      component: <RouteComponent isComponentDir={isComponentDir} lazyComponent={route.component} />,
      state: {
        lang,
        name: path,
      },
    });
  });

  if (Array.isArray(locales)) {
    locales.forEach((locale) => {
      routes.push({
        path: '*',
        redirect: defaultLang === locale[0] ? '/' : `/${locale[0]}`,
        state: {
          lang: locale[0],
        },
      });
    });
  }

  return routes;
}

export default initRoutes;

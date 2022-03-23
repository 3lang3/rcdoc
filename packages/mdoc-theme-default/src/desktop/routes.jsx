/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { getLang, setDefaultLang } from '../common/locales';
import { LazyFallback } from './components/LazyFallback';
import MdPage from './components/MdPage';

const PreviewerComp = ({ lazyComponent: LazyComponent, ...props }) => {
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({ MdContent, frontmatter = {}, slugs = [], filePath }) => {
          return (
            <MdPage
              {...props}
              frontmatter={frontmatter}
              slugs={slugs}
              filePath={filePath}
            >
              {({ previewer, api }) => (
                <MdContent previewer={previewer} api={api} />
              )}
            </MdPage>
          );
        }}
      </LazyComponent>
    </React.Suspense>
  );
};

export function getLangFromRoute(pathname, locales) {
  const currentLang = pathname.split('/')[1];
  const langs = locales.map(el => el[0]);

  if (langs.indexOf(currentLang) !== -1) {
    return currentLang;
  }
  return getLang();
}

function initRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = locales[0][0];

  setDefaultLang(defaultLang);

  const getRoutes = () => {
    const routes = [];

    unprocessedRoutes.forEach(menu => {
      const { lang, title, path, redirect } = menu;
      if (redirect) {
        routes.push({ path, redirect });
        return;
      }
      const isDefaultLang = lang === defaultLang;
      routes.push({
        title: title,
        name: `${lang}/${path}`,
        path: isDefaultLang ? `${path}` : `/${lang}${path}`,
        component: <PreviewerComp lazyComponent={menu.component} />,
        state: {
          lang,
          name: path,
        },
      });
    });

    locales.forEach(locale => {
      routes.push({
        path: '*',
        redirect: defaultLang === locale[0] ? '/' : `/${locale[0]}`,
        state: {
          lang: locale[0],
        },
      });
    });

    return routes;
  };

  return getRoutes();
}

export default initRoutes;

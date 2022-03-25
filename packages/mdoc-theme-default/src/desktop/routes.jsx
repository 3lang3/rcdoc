/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { setDefaultLang } from '../common/locales';
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

function initRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = !locales ? '' : locales[0][0];

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

    if (Array.isArray(locales)) {
      locales.forEach(locale => {
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
  };

  return getRoutes();
}

export default initRoutes;

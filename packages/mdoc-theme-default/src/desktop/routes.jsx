/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { setDefaultLang } from '../common/locales';
import { LazyFallback } from './components/LazyFallback';
import Layout from './components';
import MdPage from './components/MdPage';

const RouteComponent = ({
  lazyComponent: LazyComponent,
  isComponentDir,
  ...props
}) => {
  return (
    <Layout>
      <React.Suspense fallback={<LazyFallback />}>
        <LazyComponent>
          {({
            MdContent,
            frontmatter = {},
            slugs = [],
            filePath,
            updatedTime,
          }) => {
            return (
              <MdPage
                {...props}
                frontmatter={frontmatter}
                slugs={slugs}
                filePath={filePath}
                updatedTime={updatedTime}
                isComponentDir={isComponentDir}
              >
                {({ previewer, api }) => (
                  <MdContent previewer={previewer} api={api} />
                )}
              </MdPage>
            );
          }}
        </LazyComponent>
      </React.Suspense>
    </Layout>
  );
};

function initRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = !locales ? '' : locales[0][0];

  setDefaultLang(defaultLang);

  const routes = [];

  unprocessedRoutes.forEach(route => {
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
      component: (
        <RouteComponent
          isComponentDir={isComponentDir}
          lazyComponent={route.component}
        />
      ),
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
}

export default initRoutes;

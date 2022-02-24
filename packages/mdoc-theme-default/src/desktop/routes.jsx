/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { decamelize } from '../common';
import { getLang, setDefaultLang } from '../common/locales';
import MdPage from './components/MdPage';

export function getLangFromRoute(pathname, locales) {
  const currentLang = pathname.split('/')[1];
  const langs = locales.map(el => el[0]);

  if (langs.indexOf(currentLang) !== -1) {
    return currentLang;
  }
  return getLang();
}

function initRoutes({ config, menus }) {
  const { locales } = config;
  const defaultLang = locales[0][0];

  setDefaultLang(defaultLang);

  const getRoutes = () => {
    const routes = [];

    menus.forEach(menu => {
      const { lang, path } = menu;
      console.log(menu)
      const LazyComponent = React.lazy(() =>
        import(/* @vite-ignore */ menu.filePath),
      );

      const PreviewerComp = props => (
        <LazyComponent>
          {({ MdContent, frontmatter = {}, slugs = [] }) => {
            return (
              <MdPage {...props} frontmatter={frontmatter} slugs={slugs}>
                {({ previewer }) => <MdContent previewer={previewer} />}
              </MdPage>
            );
          }}
        </LazyComponent>
      );

      const isDefaultLang = lang === defaultLang;

      routes.push({
        name: `${lang}/${path}`,
        path: isDefaultLang ? `${path}` : `/${lang}${path}`,
        component: p => <PreviewerComp {...p} />,
        state: {
          lang,
          name: path,
        },
      });
    });

    locales.forEach(locale => {
      routes.push({
        path: '*',
        redirect: () => (defaultLang === locale[0] ? '/' : `/${locale[0]}`),
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

import React from 'react';
import { LazyFallback } from './components/LazyFallback';

const DemoRouteComponent = ({ lazyComponent: LazyComponent, ...props }) => {
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({ demos }) => {
          return (
            <div className="doc-demo">
              {demos.map(({ Component, key, ...props }) => (
                <div className="doc-demo__item" key={key}>
                  {props.title && (
                    <h4 className="doc-demo__title">{props.title}</h4>
                  )}
                  <Component />
                </div>
              ))}
            </div>
          );
        }}
      </LazyComponent>
    </React.Suspense>
  );
};

function initDemoRoutes({ locales, unprocessedRoutes }) {
  const defaultLang = !locales ? '' : locales[0][0];

  const routes = [];

  unprocessedRoutes
    .filter(route => route.isComponentDir)
    .forEach(route => {
      const { lang, title, path, redirect } = route;
      if (redirect) {
        routes.push({ path, redirect });
        return;
      }
      const isDefaultLang = lang === defaultLang;
      routes.push({
        title: title,
        name: `${lang}/${path}`,
        path: isDefaultLang ? `/~demo${path}` : `/~demo${lang}${path}`,
        component: <DemoRouteComponent lazyComponent={route.component} />,
        state: {
          lang,
          name: path,
        },
      });
    });

  return routes;
}

export default initDemoRoutes;

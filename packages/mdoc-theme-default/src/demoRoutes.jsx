import React from 'react';
import clsx from 'clsx';
import { LazyFallback } from './components/LazyFallback';

const DemoRouteComponent = ({ lazyComponent: LazyComponent, title }) => {
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({ demos, frontmatter = {} }) => {
          const { simulator = {} } = frontmatter;
          return (
            <div
              className={clsx('doc-simulator-demo', simulator.className)}
              style={simulator.style}
            >
              <div className="doc-simulator-demo__header">{title}</div>
              {demos.map(({ Component, key, ...props }) => (
                <div className="doc-simulator-demo__item" key={key}>
                  {props.title && (
                    <h4 className="doc-simulator-demo__title">{props.title}</h4>
                  )}
                  <div
                    className={clsx('doc-simulator-demo__content', {
                      'doc-simulator-demo__content--compact': props.compact,
                    })}
                  >
                    <Component />
                  </div>
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
        path: isDefaultLang ? `/~demo${path}` : `/~demo/${lang}${path}`,
        component: (
          <DemoRouteComponent title={title} lazyComponent={route.component} />
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

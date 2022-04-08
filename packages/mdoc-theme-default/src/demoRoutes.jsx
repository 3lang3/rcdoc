import React from 'react';
import clsx from 'clsx';
import { LazyFallback } from './components/LazyFallback';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@mdoc/theme';

const DemoRouteComponent = ({ lazyComponent: LazyComponent, title }) => {
  const navigate = useNavigate();
  const showBackBtn = window.self === window.top;
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
              <div
                className={clsx('doc-simulator-demo__header', {
                  'doc-simulator-demo__header--back': showBackBtn,
                })}
              >
                <span
                  className="doc-simulator-demo__back"
                  onClick={() => navigate(-1)}
                >
                  <Icons.LeftIcon />
                </span>
                {title}
              </div>
              {demos.map(({ Component, key, ...props }) => {
                return (
                  <div className="doc-simulator-demo__item" key={key}>
                    {props.title && (
                      <h4 className="doc-simulator-demo__title">
                        {props.title}
                      </h4>
                    )}
                    <div
                      className={clsx('doc-simulator-demo__content', {
                        'doc-simulator-demo__content--compact':
                          (props.compact &&
                            props.compact !== 'false' &&
                            props.compact !== '{false}') ??
                          simulator?.compact,
                      })}
                    >
                      <Component />
                    </div>
                  </div>
                );
              })}
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
        name: `/~demo/${lang}${path}`,
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

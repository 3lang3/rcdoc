import clsx from 'clsx';
import React from 'react';
import { LazyFallback } from '../LazyFallback';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@mdoc/theme';
import { inIframe } from '../../common';

export const SimulatorRouteComponent = ({
  lazyComponent: LazyComponent,
  title,
}) => {
  const navigate = useNavigate();
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({ demos, frontmatter = {} }) => {
          const { simulator = {} } = frontmatter as any;
          return (
            <div
              className={clsx('doc-simulator-demo', simulator.className)}
              style={simulator.style}
            >
              <div
                className={clsx('doc-simulator-demo__header', {
                  'doc-simulator-demo__header--back': !inIframe,
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

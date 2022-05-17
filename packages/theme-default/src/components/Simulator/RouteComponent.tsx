import clsx from 'clsx';
import React from 'react';
import { LazyFallback } from '../LazyFallback';
import { useNavigate } from 'react-router-dom';
import { Icons } from '@rcdoc/theme';
import { inIframe } from '../../common';

export const SimulatorRouteComponent = ({
  lazyComponent: LazyComponent,
  simulatorCompact,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <React.Suspense fallback={<LazyFallback mode="mobile" />}>
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
                  onClick={() => navigate((window.history.length <= 1 ? '/~demo' : -1) as any)}
                >
                  <Icons.LeftIcon />
                </span>
                {title}
              </div>
              {demos.map(({ Component, key, ...props }) => {
                return (
                  <div className="doc-simulator-demo__item" key={key}>
                    {props.title && <h4 className="doc-simulator-demo__title">{props.title}</h4>}
                    <div
                      className={clsx('doc-simulator-demo__content', {
                        'doc-simulator-demo__content--compact':
                          (props.compact &&
                            props.compact !== 'false' &&
                            props.compact !== '{false}') ??
                          simulator?.compact ??
                          simulatorCompact,
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

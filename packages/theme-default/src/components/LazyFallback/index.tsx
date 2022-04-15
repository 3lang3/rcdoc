import React from 'react';
import clsx from 'clsx';
import './index.less';

type LinerLoaderProps = {
  type?: 'mobile' | 'site';
} & React.HTMLAttributes<HTMLDivElement>;

export const LinerLoader = ({ type = 'site', className, ...props }: LinerLoaderProps) => {
  return (
    <div
      className={clsx('doc-content__loader', {
        'doc-content__loader--mobile': type === 'mobile',
      })}
      {...props}
    >
      <span className="doc-content__loader-bar1" />
      <span className="doc-content__loader-bar2" />
    </div>
  );
};

export const LazyFallback = () => {
  React.useEffect(() => {
    document.body.classList.add('show-content-loader');
    return () => {
      document.body.classList.remove('show-content-loader');
    };
  }, []);
  return null;
};

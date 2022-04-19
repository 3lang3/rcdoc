import React from 'react';
import clsx from 'clsx';
import './index.less';
import MarkdownPageContext from '../../context';

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

type LazyFallbackProps = {
  mode?: 'site' | 'mobile';
};

export const LazyFallback: React.FC<LazyFallbackProps> = ({ mode = 'site' }) => {
  const { dispatch } = React.useContext(MarkdownPageContext);
  React.useEffect(() => {
    if (mode === 'site') {
      dispatch({ loading: true });
    }
    document.body.classList.add('show-content-loader');
    return () => {
      document.body.classList.remove('show-content-loader');
    };
  }, []);
  return null;
};

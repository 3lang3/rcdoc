import React from 'react';
import './index.less';

export const LinerLoader = (props) => {
  return (
    <div className="vant-doc-content__loader" style={props.style}>
      <span className="vant-doc-content__loader-bar1" />
      <span className="vant-doc-content__loader-bar2" />
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

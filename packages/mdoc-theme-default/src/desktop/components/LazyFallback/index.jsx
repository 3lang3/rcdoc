import React from 'react';
import './index.less'

export const LinerLoader = () => {
  return (
    <div className="vant-doc-content__loader">
      <span className="vant-doc-content__loader-bar1" />
      <span className="vant-doc-content__loader-bar2" />
    </div>
  );
};

let timer;
export const LazyFallback = () =>  {
  React.useEffect(() => {
    let render = false
    const show = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        document.body.classList.add('show-content-loader');
        render = true
      }, 200);
    }
    show();
    return () => {
      if (!render) {
        clearTimeout(timer);
        return
      }
      document.body.classList.remove('show-content-loader')
    }
  }, [])
  return null
}

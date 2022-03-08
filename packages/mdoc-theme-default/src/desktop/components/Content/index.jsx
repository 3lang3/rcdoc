import React from 'react';
import clsx from 'clsx';
import './index.less';

const Loader = () => {
  return <div className="vant-doc-content__loader"></div>
}

export default (props) => {
  return (
    <div className={clsx('vant-doc-content', `vant-doc-content--${props.currentCompnentName}`)}>
      
      {props.children}
    </div>
  );
};

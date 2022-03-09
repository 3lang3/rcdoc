import React from 'react';
import clsx from 'clsx';
import './index.less';
import { LinerLoader } from '../LazyFallback';

export default props => {
  return (
    <div
      className={clsx(
        'vant-doc-content',
        `page--${props.currentCompnentName}`,
      )}
    >
      <LinerLoader />
      {props.children}
    </div>
  );
};

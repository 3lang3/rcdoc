import React from 'react';
import clsx from 'clsx';
import { LinerLoader } from '../LazyFallback';

import './index.less';

export default props => {
  return (
    <div
      className={clsx(
        'doc-container',
        'doc-row',
        `page--${props.currentPageName}`,
        {
          'doc-container--menu': props.hasMenu,
        },
      )}
    >
      <LinerLoader />
      {props.children}
    </div>
  );
};

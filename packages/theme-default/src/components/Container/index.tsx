import React from 'react';
import clsx from 'clsx';
import { LinerLoader } from '../LazyFallback';
import Simulator from '../Simulator';
import { Flex } from '@rcdoc/theme';
import './index.less';

export default (props) => {
  const { config } = props;
  return (
    <Flex
      align="flex-start"
      className={clsx('doc-container', `page--${props.currentPageName}`, {
        'doc-container--menu': props.hasMenu,
      })}
    >
      <LinerLoader />
      <div className="doc-container-markdown">{props.children}</div>
      {!!config?.site?.themeConfig?.simulator && <Simulator />}
    </Flex>
  );
};

import React from 'react';
import clsx from 'clsx';
import { LinerLoader } from '../LazyFallback';
import Simulator from '../Simulator';
import Slugs from '../Slugs';
import './index.less';
import { Flex } from '@rcdoc/theme';

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
      <Slugs />
      {config?.site?.themeConfig?.simulator && <Simulator />}
    </Flex>
  );
};

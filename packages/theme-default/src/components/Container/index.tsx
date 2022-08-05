import React from 'react';
import clsx from 'clsx';
import { LinerLoader } from '../LazyFallback';
import Simulator from '../Simulator';
import { Flex } from '@rcdoc/theme';
import Footer from '../UserDefineComponent/Footer';
import Slugs from '../Slugs';
import './index.less';

export default (props) => {
  const { config } = props;
  return (
    <>
      <div
        className={clsx('doc-container__wrarpper', {
          'doc-container--menu': props.hasMenu,
        })}
      >
        <Flex
          align="flex-start"
          className={clsx('doc-container', `page--${props.currentPageName}`)}
        >
          <LinerLoader />
          <div className="doc-container-markdown">{props.children}</div>
          {!!config?.site?.themeConfig?.simulator && <Simulator />}
          {config?.site?.slug === 'content' && <Slugs />}
        </Flex>
      </div>
      <Footer />
    </>
  );
};

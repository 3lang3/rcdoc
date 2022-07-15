/* eslint-disable no-nested-ternary */
import React from 'react';
import { MdocSiteContext, Flex } from '@rcdoc/theme';
import Logo from '../Logo';
import SearchInput from '../SearchInput';
import Navbar from './Navbar';
import { DarkModeAction, GithubAction, LangAction, VersionAction } from './HeaderAction';
import HeaderExtra from '../UserDefineComponent/HeaderExtra';

import './index.less';

const Header = () => {
  const { navs, config } = React.useContext(MdocSiteContext);
  return (
    <Flex className="doc-header" align="center" justify="space-between">
      <Flex align="center">
        <Logo />
        {Array.isArray(navs) && navs.length && <Navbar navs={navs} />}
      </Flex>
      <HeaderExtra />
      <Flex className="doc-header-action" align="center" justify="flex-end">
        {config?.site.algolia ? <SearchInput {...config?.site.algolia} /> : null}
        <VersionAction />
        <LangAction />
        <DarkModeAction />
        {config?.site?.github ? <GithubAction href={config?.site?.github} /> : null}
      </Flex>
    </Flex>
  );
};

export default Header;

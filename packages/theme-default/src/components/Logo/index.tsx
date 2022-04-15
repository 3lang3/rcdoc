import React from 'react';
import { MdocSiteContext, Flex } from '@rcdoc/theme';
import defaultLogo from './default_logo.svg';
import './index.less';

const Logo = () => {
  const { config } = React.useContext(MdocSiteContext);
  return (
    <Flex align="center" justify="space-between" className="doc-logo">
      <Flex align="center" justify="flex-start" className="doc-logo--main">
        <img alt="logo" src={config.logo || defaultLogo} />
        <span>{config.title}</span>
      </Flex>
    </Flex>
  );
};

export default Logo;

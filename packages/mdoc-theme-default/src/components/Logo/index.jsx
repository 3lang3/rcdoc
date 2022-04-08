import React from 'react';
import { MdocSiteContext, Flex } from '@mdoc/theme';
import logo from './default_logo.svg'
import './index.less';

const Logo = () => {
  const {  config } = React.useContext(MdocSiteContext);
  return (
    <Flex align='center' justify='space-between' className="vant-doc-logo">
      <Flex align='center' justify='flex-start' className="vant-doc-logo--main">
        <img alt="logo" src={config.logo || logo} />
        <span>{config.title}</span>
      </Flex>
    </Flex>
  );
};

export default Logo;

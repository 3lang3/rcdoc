import React from 'react';
import { Link } from 'react-router-dom';
import { MdocSiteContext, Flex } from '@rcdoc/theme';
import defaultLogo from './default_logo.svg';
import './index.less';

const Logo = () => {
  const { config, locale } = React.useContext(MdocSiteContext);
  const to = React.useMemo(() => {
    if (!locale) return '/';
    const { current, default: defaultLocale } = locale;

    if (current[0] === defaultLocale[0]) {
      return '/';
    }
    return `/${current[0]}`;
  }, [JSON.stringify(locale)]);

  return (
    <Flex align="center" justify="space-between" className="doc-logo">
      <Link to={to} className="doc-logo--main">
        <img alt="logo" src={config.logo || defaultLogo} />
        <span>{config.title}</span>
      </Link>
    </Flex>
  );
};

export default Logo;

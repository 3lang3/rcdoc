import React from 'react';
import logo from './default_logo.svg'
import './index.less';

const Logo = (props) => {
  const { config } = props;
  return (
    <div className="vant-doc-logo">
      <a className="vant-doc-logo--main">
        <img alt="logo" src={config.logo || logo} />
        <span>{config.title}</span>
      </a>
    </div>
  );
};

export default Logo;

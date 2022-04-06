import React from 'react';
import './index.less';

const Logo = (props) => {
  const { config } = props;
  return (
    <div className="vant-doc-logo">
      <a className="vant-doc-logo--main">
        <img alt="react vant" src={config.logo} />
        <span>{config.title}</span>
      </a>
    </div>
  );
};

export default Logo;

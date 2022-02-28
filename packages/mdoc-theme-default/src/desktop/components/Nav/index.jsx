import React, { useMemo } from 'react';
import Logo from '../Logo';
import NavLink from '../NavLink';
import './index.less';

const Nav = props => {
  const { navs, lang, defaultLang, config, versions } = props;

  const base = useMemo(() => {
    return  lang === defaultLang  ? '' : `/${lang}` ;
  }, [lang, defaultLang]);

  return (
    <div className="vant-doc-nav">
      <Logo config={config} versions={versions} />
      <div className="vant-doc-nav__group">
        {navs.map(item => (
          <div key={item.path} className="vant-doc-nav__item">
            <NavLink item={item} base={base} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;

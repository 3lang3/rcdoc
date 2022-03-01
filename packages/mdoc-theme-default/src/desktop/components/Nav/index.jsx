import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import NavLink from '../NavLink';
import './index.less';

const Nav = props => {
  const { navs, lang, defaultLang, config, versions } = props;

  const base = useMemo(() => {
    return lang === defaultLang ? '' : `/${lang}`;
  }, [lang, defaultLang]);

  return (
    <div className="vant-doc-nav">
      <Logo config={config} versions={versions} />
      <div className="vant-doc-nav__group">
        {navs.map((item, key) => (
          <React.Fragment key={key}>
            {item.children && item.title ? (
              <Link to={`${base}${item.path}`} className="vant-doc-nav__title">{item.title}</Link>
            ) : null}
            {item.children ? (
              item.children.map(c => (
                <div key={c.path} className="vant-doc-nav__item">
                  <NavLink item={c} base={base} />
                </div>
              ))
            ) : (
              <div key={item.path} className="vant-doc-nav__item">
                <NavLink item={item} base={base} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Nav;

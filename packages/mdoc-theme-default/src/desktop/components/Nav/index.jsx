import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import NavLink from '../NavLink';
import './index.less';

const NavTitle = ({ item, base }) => {
  if (!item.isLink || !item.path)
    return <div className="vant-doc-nav__title">{item.title}</div>;
  return (
    <Link to={`${base}${item.path}`} className="vant-doc-nav__title">
      {item.title}
    </Link>
  );
};

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
              <NavTitle base={base} item={item} />
            ) : null}
            {item.children ? (
              item.children.map(c => (
                <React.Fragment key={c.path}>
                  {c.group?.title ? (
                    <div className="vant-doc-nav__title">
                      {c.group.title}
                    </div>
                  ) : null}
                  <div className="vant-doc-nav__item">
                    <NavLink item={c} base={base} />
                  </div>
                </React.Fragment>
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

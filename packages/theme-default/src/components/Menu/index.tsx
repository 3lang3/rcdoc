import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuLink from './MenuLink';
import './index.less';
import clsx from 'clsx';

const MenuTitle = ({ item }) => {
  if (!item.isLink || !item.path) return <div className="doc-menu__title">{item.title}</div>;
  return (
    <Link to={item.langPath} className="doc-menu__title">
      {item.title}
    </Link>
  );
};

const Menu = (props) => {
  const { menus, config } = props;

  const { pathname } = useLocation();

  const renderMenuSlug = config?.site?.slug === 'menu';

  const renderMenus = (item, key) => {
    return (
      <React.Fragment key={key}>
        {item.children && item.title ? <MenuTitle item={item} /> : null}
        {item.group?.title ? <div className="doc-menu__title">{item.group.title}</div> : null}
        {item.children && item.children.length ? (
          item.children.map(renderMenus)
        ) : (
          <div
            key={item.path}
            className={clsx('doc-menu__item', {
              'doc-menu__item--active': pathname === item.langPath,
            })}
          >
            <MenuLink
              active={pathname === item.langPath}
              renderMenuSlug={renderMenuSlug}
              item={item}
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="doc-menu">
      <div className="doc-menu__group">{menus.map(renderMenus)}</div>
    </div>
  );
};

export default Menu;

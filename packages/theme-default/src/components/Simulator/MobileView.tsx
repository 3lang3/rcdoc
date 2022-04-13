import React from 'react';
import { menus } from '@@rcdoc/site-shared';
import { Link } from 'react-router-dom';
import { Icons, MdocSiteContext } from '@rcdoc/theme';
import Logo from '../Logo';
import './mobileView.less';

const currentRoutes = Object.values(menus)[0] as [];
const routes = flattenRoutes(currentRoutes);

export default () => {
  const { config } = React.useContext(MdocSiteContext);
  const renderMenu = React.useCallback((route) => {
    return (
      <div className="doc-mobile-group" key={route.path}>
        {route.group ? <div className="doc-mobile-group__category">{route.group.title}</div> : null}
        <Link className="doc-mobile-group__link" to={`/~demo${route.path}`}>
          {route.title}
          <Icons.RightIcon />
        </Link>
        {Array.isArray(route.children) ? route.children.map(renderMenu) : null}
      </div>
    );
  }, []);

  return (
    <div className="doc-mobile">
      <div className="doc-mobile-header">
        <div className="doc-mobile-header__logo">
          <Logo />
          {config.description && (
            <div className="doc-mobile-header__desc">{config.description}</div>
          )}
        </div>

        {/* <p>
          如果你想查阅完整的组件文档，请在桌面浏览器中访问：
          <a href="https://mobile.ant.design" target="_blank">
            https://mobile.ant.design
          </a>
        </p> */}
      </div>
      <div className="doc-mobile-content">{routes.map(renderMenu)}</div>
    </div>
  );
};

function flattenRoutes(routes: any[]) {
  function search(el) {
    if (Array.isArray(el.children)) return search(el.children);
    return el;
  }

  return routes
    .reduce((a, v) => {
      a = a.concat(search(v));
      return a;
    }, [])
    .filter((el) => el.isComponentDir);
}

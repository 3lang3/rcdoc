import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.less';

const NavbarItem = ({ item }) => {
  if (Array.isArray(item.children) && item.children.length) {
    return <div className="vant-doc-navbar__item">{item.title}</div>;
  }
  if (/^https?:\/\//.test(item.path))
    return (
      <a className="vant-doc-navbar__item" href={item.path}>
        {el.title}
      </a>
    );
  return (
    <Link className="vant-doc-navbar__item" to={item.path}>
      {item.title}
    </Link>
  );
};

const Navbar = ({ navs = [] }) => {
  return (
    <div className="vant-doc-navbar">
      {navs.map((el, i) => (
        <NavbarItem key={i} item={el} />
      ))}
    </div>
  );
};

export default Navbar;

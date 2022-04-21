import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Flex, Dropdown, Icons } from '@rcdoc/theme';
import './index.less';
import clsx from 'clsx';

export const NavbarLink = ({ path, type = 'navlink', ...props }) => {
  if (/^https?:\/\//.test(path)) {
    return (
      <a href={path} className={props.className} target="_blank">
        {props.children} <Icons.HttpLinkIcon />
      </a>
    );
  }
  return type === 'navlink' ? (
    <NavLink
      end={props.index}
      className={({ isActive }) =>
        clsx(props.className, {
          'doc-navbar__link--active': isActive,
        })
      }
      to={path}
    >
      {props.children}
    </NavLink>
  ) : (
    <Link className={props.className} to={path}>
      {props.children}
    </Link>
  );
};

const NavbarItem = ({ nav }) => {
  const overlay =
    Array.isArray(nav.children) &&
    nav.children.map((item) => (
      <NavbarLink
        type="link"
        className="doc-navbar__sublink"
        key={item.path || item.title}
        path={item.path}
      >
        {item.title}
      </NavbarLink>
    ));
  return (
    <Dropdown className="doc-navbar__item" key={nav.path || nav.title} overlay={overlay}>
      {nav.path ? (
        <NavbarLink className="doc-navbar__link" path={nav.path} index={nav.index}>
          {nav.title}
        </NavbarLink>
      ) : (
        nav.title
      )}
    </Dropdown>
  );
};

const Navbar = ({ navs = [] }) => {
  return (
    <Flex tag="nav" className="doc-navbar">
      {navs.map((el, i) => (
        <NavbarItem key={i} nav={el} />
      ))}
    </Flex>
  );
};

export default Navbar;

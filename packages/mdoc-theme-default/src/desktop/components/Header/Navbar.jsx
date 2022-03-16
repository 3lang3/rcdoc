import React from 'react';
import { Link } from 'react-router-dom';
import { Flex, Icons } from '@mdoc/theme';
import './Navbar.less';

const NavbarLink = ({ item, ...props }) => {
  if (/^https?:\/\//.test(item.path)) {
    return (
      <a href={item.path} target="_blank">
        {props.children} <Icons.HttpLinkIcon />
      </a>
    );
  }
  return <Link to={item.path}>{props.children}</Link>;
};

const NavbarItem = ({ nav }) => {
  const child = nav.children && nav.children.length && (
    <ul className="doc-navbar__child">
      {nav.children.map(item => (
        <li key={item.path || item.title}>
          <NavbarLink item={item}>{item.title}</NavbarLink>
        </li>
      ))}
    </ul>
  );
  return (
    <Flex tag="section" align="center" justify="center" key={nav.path || nav.title}>
      {nav.path ? <NavbarLink item={nav}>{nav.title}</NavbarLink> : nav.title}
      {child}
    </Flex>
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

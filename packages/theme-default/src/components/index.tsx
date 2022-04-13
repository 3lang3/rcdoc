import React from 'react';
import { MdocSiteContext } from '@rcdoc/theme';
import Header from './Header';
import Menu from './Menu';
import Container from './Container';
import { inIframe } from '../common';
import { useLocation } from 'react-router-dom';

const Doc = (props) => {
  const { pathname } = useLocation();
  const { config, menus } = React.useContext(MdocSiteContext);
  const hasMenu = !!menus.length;
  if (inIframe || pathname.startsWith('/~demo')) return props.children;
  return (
    <>
      <Header />
      {hasMenu && <Menu config={config} menus={menus} />}
      <Container hasMenu={hasMenu}>{props.children}</Container>
    </>
  );
};

export default Doc;

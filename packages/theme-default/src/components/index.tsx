import React from 'react';
import { MdocSiteContext } from '@rcdoc/theme';
import Header from './Header';
import Menu from './Menu';
import Container from './Container';
import { inIframe } from '../common';
import { useLocation } from 'react-router-dom';
import MarkdownPageContext from '../context';

const Layout = (props) => {
  const { pathname } = useLocation();
  const { config, menus, currentPageName } = React.useContext(MdocSiteContext);
  const hasMenu = !!menus.length;

  if (inIframe || pathname.startsWith('/~demo')) return props.children;

  return (
    <>
      <Header />
      {hasMenu && <Menu config={config} menus={menus} />}
      <Container config={config} hasMenu={hasMenu} currentPageName={currentPageName}>
        {props.children}
      </Container>
    </>
  );
};

export default (props) => {
  const [value, updateValue] = React.useState({});

  const dispatch = (val) => {
    updateValue(val);
  };
  return (
    <MarkdownPageContext.Provider value={{ value, dispatch }}>
      <Layout {...props} />
    </MarkdownPageContext.Provider>
  );
};

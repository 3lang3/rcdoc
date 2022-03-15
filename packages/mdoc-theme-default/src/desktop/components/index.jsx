import React from 'react';
import { MdocSiteContext } from '@mdoc/theme';
import Header from './Header';
import Menu from './Menu';
import Container from './Container';
import Content from './Content';

const Doc = props => {
  const { config, menus, currentPageName } = React.useContext(MdocSiteContext);
  const hasMenu = !!menus.length;

  return (
    <div className="vant-doc">
      <Header />
      {hasMenu && <Menu config={config} menus={menus} />}
      <Container hasMenu={hasMenu}>
        <Content currentCompnentName={currentPageName}>
          {props.children}
        </Content>
      </Container>
    </div>
  );
};

export default Doc;

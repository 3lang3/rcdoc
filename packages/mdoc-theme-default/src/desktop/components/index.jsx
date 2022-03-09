import React from 'react';
import Header from './Header';
import Menu from './Menu';
import Container from './Container';
import Content from './Content';

const Doc = props => {
  const {
    lang,
    defaultLang,
    versions,
    langConfigs,
    config,
    menus,
    currentCompnentName,
  } = props;

  const hasMenu = !!menus.length

  return (
    <div className="vant-doc">
      <Header
        lang={lang}
        defaultLang={defaultLang}
        config={config}
        langConfigs={langConfigs}
        versions={versions}
      />
      {hasMenu && (
        <Menu
          config={config}
          lang={lang}
          defaultLang={defaultLang}
          menus={menus}
          versions={versions}
        />
      )}
      <Container hasMenu={hasMenu}>
        <Content currentCompnentName={currentCompnentName}>
          {props.children}
        </Content>
      </Container>
    </div>
  );
};

export default Doc;

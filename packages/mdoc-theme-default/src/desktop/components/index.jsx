import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Container from './Container';
import Content from './Content';

const Doc = props => {
  const {
    lang,
    defaultLang,
    versions,
    langConfigs,
    config,
    navs,
    currentCompnentName,
  } = props;

  React.useEffect(() => {}, []);

  return (
    <div className="vant-doc">
      <Nav
        config={config}
        lang={lang}
        defaultLang={defaultLang}
        navs={navs}
        versions={versions}
      />
      <Container>
        <Header lang={lang} defaultLang={defaultLang} config={config} langConfigs={langConfigs} />
        <Content currentCompnentName={currentCompnentName}>
          {props.children}
        </Content>
      </Container>
    </div>
  );
};

export default Doc;

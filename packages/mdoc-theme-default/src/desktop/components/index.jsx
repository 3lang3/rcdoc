import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Container from './Container';
import Content from './Content';

const Doc = props => {
  const {
    lang,
    versions,
    langConfigs,
    config,
    currentCompnentName,
  } = props;

  React.useEffect(() => {}, []);

  return (
    <div className="vant-doc">
      <Nav
        config={config}
        lang={lang}
        navConfig={config.nav}
        versions={versions}
      />
      <Container>
        <Header lang={lang} config={config} langConfigs={langConfigs} />
        <Content currentCompnentName={currentCompnentName}>
          {props.children}
        </Content>
      </Container>
    </div>
  );
};

export default Doc;

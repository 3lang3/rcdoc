import React from 'react';
import SiteTheme from 'mdoc-theme-default';
import { config, documents } from 'site-shared';
import SiteContext from './context';

const App = () => {
  return (
    <SiteContext.Consumer value={{ config, documents }}>
      <SiteTheme />
    </SiteContext.Consumer>
  );
};

export default App;

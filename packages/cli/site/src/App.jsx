import React from 'react';
import SiteTheme from 'mdoc-theme-default';
import { config, documents } from 'site-shared';
import { MdocSiteContext } from '@mdoc/theme';

const App = () => {
  return (
    <MdocSiteContext.Provider value={{ config, documents }}>
      <SiteTheme />
    </MdocSiteContext.Provider>
  );
};

export default App;

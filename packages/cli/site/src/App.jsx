import React from 'react';
import SiteTheme from 'mdoc-theme-default';
import * as shared from 'site-shared';
import { MdocSiteContext } from '@mdoc/theme';

const App = () => {
  return (
    <MdocSiteContext.Provider value={{ ...shared }}>
      <SiteTheme />
    </MdocSiteContext.Provider>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import SiteTheme from 'mdoc-theme-default';
import { MdocSiteContext } from '@mdoc/theme';
import * as shared from 'site-shared-lazy';

const App = () => {
  return (
    <MdocSiteContext.Provider value={{ ...shared }}>
      <SiteTheme />
    </MdocSiteContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

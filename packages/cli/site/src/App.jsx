import React from 'react';
import SiteTheme from 'mdoc-theme-default';
import { config, documents } from 'site-shared';

const App = () => {
  return <SiteTheme config={config} documents={documents} />;
};

export default App;

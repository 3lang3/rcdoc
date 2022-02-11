import React from 'react';
import { config, documents } from 'mdoc-site-shared';

const PresetTheme = ({ config, documents }) => {
  console.log(config, documents);
  return <div>this is PresetTheme</div>;
};

const App = () => {
  return <PresetTheme config={config} documents={documents} />;
};

export default App;

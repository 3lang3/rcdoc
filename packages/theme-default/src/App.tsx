import React from 'react';
import { MdocSiteContext } from '@rcdoc/theme';
import Layout from './components';
import DesktopApp from './views/desktop';
import SimulatorApp from './views/simulator';
import './index.less';

const App = () => {
  const { config } = React.useContext(MdocSiteContext);
  return (
    <Layout>
      <DesktopApp config={config} />
      {!!config?.site?.themeConfig?.simulator && <SimulatorApp config={config} />}
    </Layout>
  );
};

export default App;

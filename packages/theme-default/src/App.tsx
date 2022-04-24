import React from 'react';
import { MdocSiteContext } from '@rcdoc/theme';
import Layout from './components';
import DesktopApp from './views/desktop';
import MobileApp from './views/mobile';
import './index.less';

const App = () => {
  const { config } = React.useContext(MdocSiteContext);
  return (
    <Layout>
      <DesktopApp config={config} />
      {!!config?.site?.themeConfig?.simulator && <MobileApp config={config} />}
    </Layout>
  );
};

export default App;

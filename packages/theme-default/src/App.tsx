import React from 'react';
import { MdocSiteContext } from '@rcdoc/theme';
import Layout from './components';
import DesktopApp from './views/desktop';
import MobileApp from './views/mobile';
import './index.less';

const App = React.memo(
  () => {
    const { config } = React.useContext(MdocSiteContext);
    return (
      <Layout>
        <DesktopApp config={config} />
        {config?.site?.themeConfig?.simulator && <MobileApp config={config} />}
      </Layout>
    );
  },
  () => true,
);

export default App;

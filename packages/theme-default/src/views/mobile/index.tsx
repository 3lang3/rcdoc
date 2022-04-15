import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import initDemoRoutes from './demoRoutes';
import _routes from '@@rcdoc/site-shared-routes';
import MobileView from '../../components/Simulator/MobileView';
import DemoWrapper from '../../components/Simulator/DemoWrapper';
import { isMobile } from '../../common';

const MobileApp = ({ config }) => {
  const navigate = useNavigate();

  const demoRoutes = React.useMemo(() => {
    return initDemoRoutes({
      locales: config.locales,
      unprocessedRoutes: _routes,
    });
  }, [config.locales, _routes]);

  React.useEffect(() => {
    // Mobile view redirect to /~demo path
    if (isMobile) {
      navigate('/~demo', { replace: true });
    }
  }, []);

  return (
    <DemoWrapper>
      <Routes>
        {demoRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        <Route path="/~demo" element={<MobileView />} />
      </Routes>
    </DemoWrapper>
  );
};

export default MobileApp;

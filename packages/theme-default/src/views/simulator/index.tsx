import React from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import initDemoRoutes from './routes';
import _routes from '@@rcdoc/site-shared-routes';
import MobileView from '../../components/Simulator/MobileView';
import DemoWrapper from '../../components/Simulator/DemoWrapper';
import { isMobile } from '../../common';

const SimulatorApp = ({ config }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const demoRoutes = React.useMemo(() => {
    return initDemoRoutes({
      config,
      unprocessedRoutes: _routes,
    });
  }, [config.locales, _routes]);

  React.useEffect(() => {
    // Mobile view redirect to /~demo path
    if (isMobile && !location.pathname.startsWith('/~demo')) {
      navigate('/~demo', { replace: true });
    }
  }, []);

  return (
    <DemoWrapper>
      <Routes>
        {demoRoutes.map((route) =>
          route.redirect ? (
            <Route
              key={route.path}
              path={`/~demo${route.path}`}
              element={<Navigate to={`/~demo${route.redirect}`} />}
            />
          ) : (
            <Route key={route.path} path={route.path} element={route.component} />
          ),
        )}
        <Route path="/~demo" element={<MobileView />} />
      </Routes>
    </DemoWrapper>
  );
};

export default SimulatorApp;

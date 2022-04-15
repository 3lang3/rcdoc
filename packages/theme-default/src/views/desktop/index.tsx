import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import _routes from '@@rcdoc/site-shared-routes';
import initRoutes from './routes';

const DesktopApp = ({ config }) => {
  const routes = React.useMemo(() => {
    return initRoutes({
      locales: config.locales,
      unprocessedRoutes: _routes,
    });
  }, [config.locales, _routes]);

  return (
    <Routes>
      {routes.map((route) =>
        route.redirect ? (
          <Route key={route.path} path={route.path} element={<Navigate to={route.redirect} />} />
        ) : (
          <Route key={route.path} path={route.path} element={route.component} />
        ),
      )}
    </Routes>
  );
};

export default DesktopApp;

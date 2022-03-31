import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MdocSiteContext } from '@mdoc/theme';
import initRoutes from './routes';
import initDemoRoutes from './demoRoutes';
import _routes from '@@mdoc/site-shared-routes';
import './index.less';

const App = React.memo(
  () => {
    const { config } = React.useContext(MdocSiteContext);

    const routes = React.useMemo(() => {
      return initRoutes({
        locales: config.locales,
        unprocessedRoutes: _routes,
      });
    }, [config.locales, _routes]);

    const demoRoutes = React.useMemo(() => {
      return initDemoRoutes({
        locales: config.locales,
        unprocessedRoutes: _routes,
      });
    }, [config.locales, _routes]);

    return (
      <>
        <Routes>
          {routes.map(route =>
            route.redirect ? (
              <Route
                key={route.path}
                path={route.path}
                element={<Navigate to={route.redirect} />}
              />
            ) : (
              <Route
                key={route.path}
                path={route.path}
                element={route.component}
              />
            ),
          )}
          {demoRoutes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
      </>
    );
  },
  () => true,
);

export default App;

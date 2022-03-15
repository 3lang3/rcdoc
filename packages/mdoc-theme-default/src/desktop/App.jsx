import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MdocSiteContext } from '@mdoc/theme';
import Doc from './components/index';
import initRoutes from './routes';
import './index.less';

const App = () => {
  const { config, routes: _routes } = React.useContext(MdocSiteContext);

  const routes = useMemo(() => {
    return initRoutes({ locales: config.locales, unprocessedRoutes: _routes });
  }, [config.locales, _routes]);

  return (
    <Doc>
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
      </Routes>
    </Doc>
  );
};

export default App;

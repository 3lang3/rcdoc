import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MdocSiteContext } from '@mdoc/theme';
import initRoutes from './routes';
import initDemoRoutes from './demoRoutes';
import _routes from '@@mdoc/site-shared-routes';
import './index.less';
import MobileView from './components/Simulator/MobileView';
import { isMobile } from './common';

const App = React.memo(
  () => {
    const { config } = React.useContext(MdocSiteContext);
    const navigate = useNavigate()

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

    React.useEffect(() => {
      if (isMobile) {
        navigate('/~demo', { replace: true });
      }
    }, []);

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

          <Route path='/~demo' element={<MobileView />} />
        </Routes>
      </>
    );
  },
  () => true,
);

export default App;

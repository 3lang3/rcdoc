import React from 'react';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { config } from '@@rcdoc/site-shared';

const TargetRouter = config.site?.history === 'hash' ? HashRouter : BrowserRouter;

export default () => {
  return (
    <TargetRouter>
      <App />
    </TargetRouter>
  );
};

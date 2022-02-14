import React from 'react';
import App from './desktop/App';
import { HashRouter } from 'react-router-dom';

export default () => {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

import React from 'react';
import App from './desktop/App';
import { BrowserRouter } from 'react-router-dom';

export default () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

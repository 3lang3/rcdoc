import React from 'react';

export default ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

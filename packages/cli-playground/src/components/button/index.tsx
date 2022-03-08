import React from 'react';
import { Space } from 'mdoc-demo';

export default ({ children, ...props }) => (
  <Space className="button" {...props}>
    {children}
  </Space>
);

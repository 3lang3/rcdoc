import React from 'react';
import { Space } from 'mdoc-demo';

import './index.less'

export default ({ children, ...props }) => (
  <Space className="button" {...props}>
    {children}
  </Space>
);

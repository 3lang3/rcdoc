import React from 'react';
import { Space } from 'react-vant';
import type { ButtonProps, OtherProps } from './PropsType';

import './index.less';

const Button: React.FC<ButtonProps> = ({ children, ...props }) => (
  <Space className="button" {...props}>
    {children}
  </Space>
);

export const Other: React.FC<OtherProps> = (props) => <div {...props} />;

export default Button;

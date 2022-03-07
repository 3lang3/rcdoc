import React from 'react';
import clsx from 'clsx';

const Space: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx(className, 'space')} {...props}>
    {children}
  </div>
);

export default Space;

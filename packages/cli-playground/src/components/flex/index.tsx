import React from 'react';
import clsx from 'clsx';

const Flex: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={clsx(className, 'flex')} {...props}>
    {children}
  </div>
);

export default Flex;

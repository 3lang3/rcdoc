import clsx from 'clsx';
import React from 'react';
import './index.less';

type DropdownProps = {
  overlay?: React.ReactNode[];
  arrow?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Dropdown: React.FC<DropdownProps> = ({
  overlay,
  className,
  children,
  arrow = true,
  ...props
}) => {
  return (
    <div
      className={clsx('doc-dropdown', className, {
        'doc-dropdown--overlay': overlay && arrow,
      })}
      {...props}
    >
      {children}
      {overlay && <div className="doc-dropdown__child">{overlay}</div>}
    </div>
  );
};

export default Dropdown;

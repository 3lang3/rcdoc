import React from 'react';

const Space: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
}) => <div className="space">{children}</div>;

export default Space;

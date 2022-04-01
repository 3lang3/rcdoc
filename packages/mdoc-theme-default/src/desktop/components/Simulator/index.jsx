import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icons } from '@mdoc/theme'
import './index.less';

export default () => {
  const location = useLocation();
  const src = React.useMemo(() => {
    return `/~demo${location.pathname}`;
  }, [location.pathname]);
  if (!src) return null;
  return (
    <div className="doc-simulator">
      <div className="doc-simulator__wrapper">
        <Icons.DeviceBarIcon className="doc-simulator__bar" />
        <iframe className="doc-simulator__iframe" src={src}></iframe>
      </div>
    </div>
  );
};

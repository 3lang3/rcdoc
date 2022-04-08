import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icons, MdocSiteContext } from '@mdoc/theme';
import './index.less';
import { LinerLoader } from '../LazyFallback';

const Simulator = () => {
  const location = useLocation();
  const src = React.useMemo(() => {
    return `/~demo${location.pathname}`;
  }, [location.pathname]);
  if (!src) return null;

  return (
    <div className="doc-simulator">
      <div className="doc-simulator__wrapper">
        <LinerLoader style={{ left: 12, right: 12, top: 86 }} />
        <Icons.DeviceBarIcon className="doc-simulator__bar" />
        <iframe className="doc-simulator__iframe" src={src}></iframe>
      </div>
    </div>
  );
};

export default () => {
  // Simulate by controlled global context
  const { config } = React.useContext(MdocSiteContext);
  if (!config.site?.themeConfig?.simulator) return null;
  return <Simulator />;
};

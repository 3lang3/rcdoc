import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icons } from '@rcdoc/theme';
import { LinerLoader } from '../LazyFallback';
import simulatorModel from './android-device-skin.png';
import MarkdownPageContext from '../../context';
import './index.less';

const Simulator = () => {
  const location = useLocation();

  // Parser simulator src
  const src = React.useMemo(() => {
    return `/~demo${location.pathname}`;
  }, [location.pathname]);

  const initialSrc = React.useMemo(() => {
    return `/~demo${location.pathname}`;
  }, []);

  // Post src to iframe
  // Do not use src as props for iframe
  // iframe will reload the page when src changed
  // it will request site resource again
  React.useLayoutEffect(() => {
    if (!src) return;
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.contentWindow.postMessage(
        {
          type: 'replacePath',
          value: src,
        },
        '*',
      );
    }
  }, [src]);

  // Not render simulator when parser src faild
  if (!src) return null;
  return (
    <div className="doc-simulator">
      <div className="doc-simulator__wrapper" style={{ backgroundImage: `url(${simulatorModel})` }}>
        <LinerLoader type="mobile" />
        <Icons.DeviceBarIcon className="doc-simulator__bar" />
        <iframe className="doc-simulator__iframe" src={initialSrc}></iframe>
      </div>
    </div>
  );
};

export default React.memo(
  () => {
    const {
      value: { isComponentDir, frontmatter = {} },
    } = React.useContext(MarkdownPageContext);
    const { simulator } = frontmatter;

    const renderSimulator = isComponentDir && simulator !== false;
    if (!renderSimulator) return null;
    return <Simulator />;
  },
  () => true,
);

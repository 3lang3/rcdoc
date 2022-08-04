import React from 'react';
import { useLocation } from 'react-router-dom';
import { Icons, MdocSiteContext } from '@rcdoc/theme';
import MarkdownPageContext from '../../context';
import Flex from '@rcdoc/theme/components/Flex';
import Dropdown from '@rcdoc/theme/components/Dropdown';
import { QRCodeCanvas } from 'qrcode.react';
import './index.less';

const RCDOC_SIMULATOR_IFRAME_ID = 'rcdoc-simulator-iframe';

const Simulator = ({ hashHistory }) => {
  const location = useLocation();
  // Parser simulator src
  const src = React.useMemo(() => {
    return `/~demo${location.pathname}`;
  }, [location.pathname]);

  const initialSrc = React.useMemo(() => {
    return `${hashHistory ? '#' : ''}/~demo${location.pathname}`;
  }, []);

  // Post src to iframe
  // Do not use src as props for iframe
  // iframe will reload the page when src changed
  // it will request site resource again
  React.useLayoutEffect(() => {
    if (!src) return;
    const iframe = document.querySelector<HTMLIFrameElement>(`#${RCDOC_SIMULATOR_IFRAME_ID}`);
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
      <div className="doc-simulator__wrapper">
        <Icons.DeviceBarIcon className="doc-simulator__bar" />
        <iframe
          id={RCDOC_SIMULATOR_IFRAME_ID}
          className="doc-simulator__iframe"
          src={initialSrc}
        ></iframe>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Flex inline className="doc-simulator__actions" align="center" justify="center">
          <a className="doc-simulator__actions__item" title="新窗口预览" href={src} target="_blank">
            <Icons.HttpLinkIcon />
          </a>

          <Dropdown
            offset={['0px', '-15px']}
            arrow={false}
            width={120}
            placement="topCenter"
            overlay={[
              <QRCodeCanvas
                style={{ display: 'block' }}
                key="qrcode"
                size={100}
                value={`${window.location.origin}${src}`}
              />,
            ]}
          >
            <Icons.QrcodeIcon className="doc-simulator__actions__item" alt="手机扫二维码预览" />
          </Dropdown>
          <a
            className="doc-simulator__actions__item"
            title="重新加载Demo"
            onClick={() => {
              const iframe = document.querySelector<HTMLIFrameElement>(
                `#${RCDOC_SIMULATOR_IFRAME_ID}`,
              );
              if (iframe) {
                iframe.contentWindow.location.reload();
              }
            }}
            target="_blank"
          >
            <Icons.ReloadIcon />
          </a>
        </Flex>
      </div>
    </div>
  );
};

export default React.memo(
  () => {
    const {
      value: { frontmatter = {} },
    } = React.useContext(MarkdownPageContext);
    const location = useLocation();
    const { config } = React.useContext(MdocSiteContext);
    const { simulator = true, blank } = frontmatter;

    const include = config?.site?.themeConfig?.simulator?.include || [];
    const hashHistory = config.site?.history === 'hash';
    const renderSimulator =
      include.some((el) => location.pathname.includes(el) && el !== location.pathname) &&
      simulator &&
      !blank;
    if (!renderSimulator) return null;
    return <Simulator hashHistory={hashHistory} />;
  },
  () => true,
);

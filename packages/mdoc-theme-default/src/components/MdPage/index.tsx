import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import Slugs from '../Slugs';
import Simulator from '../Simulator';
import useActiveSidebarLinks from '../Slugs/useActiveSidebarLinks';

import './index.less';

const previewer = (props) => <MdPreviewer defaultShowSource {...props} />;
const api = (props) => <MdApi {...props} />;

const MdPageComponent = ({
  children,
  updatedTime,
  frontmatter = {},
  slugs = [],
  isComponentDir,
}) => {
  const { fluid, slugs: showSlugs = true, style, className, simulator } = frontmatter as any;
  const hashPath = React.useMemo(() => window.location.hash.split('#').filter(Boolean)[0], []);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [hashPath]);

  useActiveSidebarLinks();

  const updatedTimeStr = React.useMemo(() => {
    if (!updatedTime) return false;
    const updatedTimeIns = new Date(+updatedTime);
    return `${updatedTimeIns.toLocaleDateString([], {
      hour12: false,
    })} ${updatedTimeIns.toLocaleTimeString([], { hour12: false })}`;
  }, [updatedTime]);

  return (
    <div style={style} className={clsx('doc-md-wrapper', className)}>
      <section
        className={clsx('doc-md-page', {
          'doc-md-page--fluid': fluid,
        })}
      >
        {children({ previewer, api })}
        {!!updatedTimeStr && <span style={{ display: 'none' }}>Last update: {updatedTimeStr}</span>}
      </section>
      {showSlugs && <Slugs slugs={slugs} />}
      {simulator !== false && isComponentDir && <Simulator />}
    </div>
  );
};

export default (props) => {
  return <MdPageComponent {...props} />;
};

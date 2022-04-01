import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import SlugNav from './SlugNav';
import Simulator from '../Simulator';

import './index.less';

const previewer = props => <MdPreviewer defaultShowSource {...props} />;
const api = props => <MdApi {...props} />;

const MdPageComponent = ({
  children,
  updatedTime,
  frontmatter = {},
  slugs = [],
  isComponentDir,
}) => {
  const { fluid, slugs: showSlugs = true, style, className } = frontmatter;
  const hashPath = React.useMemo(
    () => window.location.hash.split('#').filter(Boolean)[0],
    [],
  );
  const formatSlugs = React.useMemo(
    () =>
      slugs
        ? slugs.map(slug => ({
            ...slug,
            id: hashPath ? `${hashPath}#${slug.id}` : slug.id,
          }))
        : [],
    [hashPath, slugs],
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [hashPath]);

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
        {!!updatedTimeStr && (
          <span style={{ display: 'none' }}>
            Last update: {updatedTimeStr}
          </span>
        )}
      </section>
      {isComponentDir && <Simulator />}
      <SlugNav show={showSlugs} slugs={formatSlugs} />
    </div>
  );
};

export default props => {
  return <MdPageComponent {...props} />;
};

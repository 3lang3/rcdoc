import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import MdApi from '../MdApi';
import SlugNav from './SlugNav';
import { LinerLoader } from '../LazyFallback';

import './index.less';

const previewer = props => <MdPreviewer {...props} />;
const api = props => <MdApi {...props} />;

const MdPageComponent = ({ children, frontmatter = {}, slugs = [] }) => {
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

  return (
    <div style={style} className={clsx('doc-md-wrapper', className)}>
      <LinerLoader />
      <section
        className={clsx('doc-md-page', {
          'doc-md-page--fluid': fluid,
        })}
      >
        {children({ previewer, api })}
      </section>
      <SlugNav show={showSlugs} slugs={formatSlugs} />
    </div>
  );
};

export default props => {
  return <MdPageComponent {...props} />;
};

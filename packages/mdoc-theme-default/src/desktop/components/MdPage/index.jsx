import React from 'react';
import clsx from 'clsx';
import MdPreviewer from '../MdPreviewer';
import SlugNav from './SlugNav';
import './index.less';

const previewer = props => <MdPreviewer {...props} />;

const MdPageComponent = ({
  children,
  frontmatter = {},
  slugs = [],
}) => {
  const { fluid, slugs: showSlugs = true, style, className } = frontmatter;

  const hashPath = React.useMemo(
    () => window.location.hash.split('#').filter(Boolean)[0],
    [],
  );

  const formatSlugs = React.useMemo(
    () => slugs.map(slug => ({ ...slug, id: hashPath ? `${hashPath}#${slug.id}` : slug.id })),
    [hashPath, slugs],
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [hashPath]);

  return (
    <div
      style={style}
      className={clsx('vant-doc-md-wrapper', className)}
    >
      {!!slugs.length && showSlugs && !fluid && <SlugNav slugs={formatSlugs} />}
      <section
        className={clsx('vant-doc-md-page', {
          'vant-doc-md-page--fluid': fluid,
        })}
      >
        {children({ previewer })}
      </section>
    </div>
  );
};

export default props => {
  return <MdPageComponent {...props} />;
};
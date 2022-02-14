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
  const { fluid, slugs: showSlugs = true } = frontmatter;

  const hashPath = React.useMemo(
    () => window.location.hash.split('#').filter(Boolean)[0],
    [],
  );

  const formatSlugs = React.useMemo(
    () => slugs.map(slug => ({ ...slug, id: `${hashPath}#${slug.id}` })),
    [hashPath, slugs],
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
    // anchor format
    replaceHeadingsId(hashPath, '.vant-doc-md-page h2');
    replaceHeadingsId(hashPath, '.vant-doc-md-page h3');
  }, [hashPath]);

  return (
    <div
      className={clsx('vant-doc-md-wrapper')}
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

function replaceHeadingsId(hashPath, target) {
  const headings = [...document.querySelectorAll(target)].filter(el => el.id);
  headings.forEach(el => {
    el.id = el.id.replace(/(.*)/, `${hashPath}#$1`);
  });
}

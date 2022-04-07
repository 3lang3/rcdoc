import React from 'react';
import clsx from 'clsx';
import './index.less';

const SlugNav = ({ slugs }) => {
  return (
    <div className="doc-md--slugs">
      {slugs.map((slug, key) => {
        return (
          <a
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            href={`#${slug.id}`}
            className={clsx('doc-md--slug', `doc-md--slug-${slug.depth}`)}
          >
            {slug.text}
          </a>
        );
      })}
    </div>
  );
};

export default ({ slugs }) => {
  const filtedSlugs = slugs.filter(
    slug => +slug.depth === 2 || +slug.depth === 3,
  );

  if (!filtedSlugs.length) return <div className="doc-md--slugs" />;
  return <SlugNav slugs={filtedSlugs} />;
};

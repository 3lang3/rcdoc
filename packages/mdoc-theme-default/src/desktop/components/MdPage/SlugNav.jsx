import React from 'react';
import clsx from 'clsx';
import './SlugNav.less';

export default ({ slugs, show }) => {
  if (!show) return null;
  if (!slugs.length) return <div className="vant-doc-md--slugs" />;
  return (
    <div className="vant-doc-md--slugs">
      {slugs.map((slug, key) => {
        if (+slug.depth === 2 || +slug.depth === 3) {
          return (
            <a
              // eslint-disable-next-line react/no-array-index-key
              key={key}
              href={`${window.location.pathname}#${slug.id}`}
              className={clsx('vant-doc-md--slug', `vant-doc-md--slug-${slug.depth}`)}
            >
              {slug.text}
            </a>
          );
        }
        return null;
      })}
    </div>
  );
};

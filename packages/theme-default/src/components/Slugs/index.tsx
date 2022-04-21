import React from 'react';
import clsx from 'clsx';
import MarkdownPageContext from '../../context';

import './index.less';
import { Link } from 'react-router-dom';

const SlugNav = ({ slugs }) => {
  return (
    <div className="doc-md--slugs">
      {slugs.map((slug, key) => {
        return (
          <Link
            // eslint-disable-next-line react/no-array-index-key
            key={key}
            to={`#${slug.id}`}
            className={clsx('doc-md--slug', `doc-md--slug-${slug.depth}`)}
          >
            {slug.text}
          </Link>
        );
      })}
    </div>
  );
};

export default () => {
  const { value } = React.useContext(MarkdownPageContext);
  const { slugs = [], frontmatter = {}, loading } = value;
  const { slug: pageSlug = true, blank } = frontmatter;
  const filtedSlugs = slugs.filter((slug) => +slug.depth === 2 || +slug.depth === 3);
  if (!pageSlug || blank) return null;
  if (!filtedSlugs.length || loading) return <div className="doc-md--slugs" />;
  return <SlugNav slugs={filtedSlugs} />;
};

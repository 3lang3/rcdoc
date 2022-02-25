import React from 'react';
import MdPage from './desktop/components/MdPage';

export const LazyPreviewer = ({ url, ...props }) => {
  const LazyComponent = React.lazy(() => import(/* @vite-ignore */url));
  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <LazyComponent>
        {({ MdContent, frontmatter = {}, slugs = [] }) => {
          return (
            <MdPage {...props} frontmatter={frontmatter} slugs={slugs}>
              {({ previewer }) => (
                <>
                  <MdContent previewer={previewer} />
                </>
              )}
            </MdPage>
          );
        }}
      </LazyComponent>
    </React.Suspense>
  );
};

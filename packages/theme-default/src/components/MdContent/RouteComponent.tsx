/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { LazyFallback } from '../LazyFallback';
import MdContent from '.';

export const RouteComponent = ({ lazyComponent: LazyComponent, ...props }) => {
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({
          MdContent: MdLoader,
          demos = [],
          frontmatter = {},
          slugs = [],
          filePath,
          updatedTime,
        }) => {
          return (
            <MdContent
              {...props}
              frontmatter={frontmatter}
              slugs={slugs}
              filePath={filePath}
              updatedTime={updatedTime}
              demos={demos}
            >
              {({ previewer, api }) => <MdLoader previewer={previewer} api={api} />}
            </MdContent>
          );
        }}
      </LazyComponent>
    </React.Suspense>
  );
};

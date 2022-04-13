/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { LazyFallback } from '../LazyFallback';
import MdPage from '.';

export const RouteComponent = ({ lazyComponent: LazyComponent, isComponentDir, ...props }) => {
  return (
    <React.Suspense fallback={<LazyFallback />}>
      <LazyComponent>
        {({ MdContent, frontmatter = {}, slugs = [], filePath, updatedTime }) => {
          return (
            <MdPage
              {...props}
              frontmatter={frontmatter}
              slugs={slugs}
              filePath={filePath}
              updatedTime={updatedTime}
              isComponentDir={isComponentDir}
            >
              {({ previewer, api }) => <MdContent previewer={previewer} api={api} />}
            </MdPage>
          );
        }}
      </LazyComponent>
    </React.Suspense>
  );
};

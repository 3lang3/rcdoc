/// <reference types="vite/client" />

declare module 'lz-string';

declare module '*.md' {
  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import React from 'react';
  type MDocPreviewerProps = {
    code: string;
    lang: string;
    key: string;
    dependencies: Record<
      string,
      {
        type: string;
        value: string;
        css: boolean;
      }
    >;
    meta: Record<string, any>;
    children: React.ReactNode;
  }

  const MdContent: React.VFC<{
    previewer?: (props: MDocPreviewerProps) => React.ReactNode;
  }>;
  const MdDemos: ({ Component: React.VFC; key: string } & Record<string, any>)[];

  const frontmatter: Record<string, string>;

  const slugs: { depth: number; text: string; id: string; }[];

  // Modify below per your usage
  export { MdContent, MdDemos, frontmatter, slugs };
}

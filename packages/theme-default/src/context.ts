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
};

type MarkdownPageContextProps = {
  value: {
    MdContent?: React.VFC<{
      previewer?: (props: MDocPreviewerProps) => React.ReactNode;
    }>;
    demos?: ({ Component: React.VFC; key: string } & Record<string, any>)[];
    frontmatter?: Record<string, any>;
    slugs?: { depth: number; text: string; id: string }[];
  };
  dispatch: (action: any) => void;
};

const MarkdownPageContext = React.createContext<MarkdownPageContextProps>({
  value: {},
  dispatch: () => {},
});

export default MarkdownPageContext;

import React from 'react';

type MarkdownPageContextProps = {
  value: {
    /** markdown页面frontmatter数据 */
    frontmatter?: Record<string, any>;
    /** markdown页面slugs数据 */
    slugs?: { depth: number; text: string; id: string }[];
    /** markdown页面加载 */
    loading?: boolean;
  };
  dispatch: (action: MarkdownPageContextProps['value']) => void;
};

const MarkdownPageContext = React.createContext<MarkdownPageContextProps>({
  value: {},
  dispatch: () => null,
});

export default MarkdownPageContext;

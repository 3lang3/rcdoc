import React from 'react';
import { HeaderExtra } from '@@rcdoc/site-custom-component';
import MarkdownPageContext from '../../context';

export default () => {
  const {
    value: { frontmatter = {} },
  } = React.useContext(MarkdownPageContext);

  const {
    header = {
      extra: true,
    },
  } = frontmatter;
  if (!header?.extra) return null;
  return <HeaderExtra />;
};

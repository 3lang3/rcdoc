import React from 'react';
import { Footer } from '@@rcdoc/site-custom-component';
import MarkdownPageContext from '../../context';

export default () => {
  const {
    value: { frontmatter = {} },
  } = React.useContext(MarkdownPageContext);

  const { footer = true } = frontmatter;

  if (!footer) return null;
  return <Footer />;
};

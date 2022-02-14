import React from 'react';
import { MdocSiteContext } from '@mdoc/theme';

const Container: React.FC<any> = () => {
  const context = React.useContext(MdocSiteContext)

  console.log('context: ', context)
  return <div>this is default theme from mdoc-theme-default</div>
}

export default () => {
  return (
    <Container />
  );
};

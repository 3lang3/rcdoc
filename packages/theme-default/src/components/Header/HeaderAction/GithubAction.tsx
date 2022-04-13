import React from 'react';
import { Flex, Icons } from '@rcdoc/theme';

export default ({ href }) => {
  const onClick = () => {
    window.open(href, '_blank');
  };
  return (
    <Flex onClick={onClick} align="center" className="doc-navbar__item doc-header-action__github">
      <Icons.GitHubIcon />
    </Flex>
  );
};

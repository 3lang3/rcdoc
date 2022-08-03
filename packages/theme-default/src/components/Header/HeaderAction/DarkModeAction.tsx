import React from 'react';
import { Flex, Icons, useLocalStorageState } from '@rcdoc/theme';

const useTheme = (): [string, () => void] => {
  const [theme, updateTheme] = useLocalStorageState('MDOC_SITE_THEME', {
    defaultValue: 'light',
  });

  const toggleTheme = () => {
    const updated = theme === 'light' ? 'dark' : 'light';
    updateTheme(updated);
    updateHtmlTag(updated);
  };

  const updateHtmlTag = (str) => {
    const html = document.querySelector('html');
    html.setAttribute('data-theme', str);
  };

  React.useEffect(() => {
    updateHtmlTag(theme);
  }, []);

  return [theme, toggleTheme];
};

export default () => {
  const [theme, toggleTheme] = useTheme();
  return (
    <Flex onClick={toggleTheme} align="center" className="doc-navbar__item doc-header-action__dark">
      {theme === 'light' ? <Icons.MoonIcon /> : <Icons.LightIcon />}
    </Flex>
  );
};

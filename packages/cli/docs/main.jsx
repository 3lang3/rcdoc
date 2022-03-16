import React from 'react';
import ReactDOM from 'react-dom';
import SiteTheme from 'mdoc-theme-default';
import { MdocSiteContext } from '@mdoc/theme';
import * as shared from 'site-shared';
import {
  getMenuItemByPageName,
  getLocaleFromPathname,
  getMenuByPathname,
} from './utils';
import usePathname from './hooks/usePathname'

const App = () => {
  const pathname = usePathname()
  const { config, menus: _menus, packageVersion } = shared;
  const { locales } = config;

  // 默认locale
  const defaultLocale = React.useMemo(
    () => locales[0],
    [JSON.stringify(locales)],
  );

  // 当前locale
  const currentLocale = React.useMemo(
    () => getLocaleFromPathname(pathname, locales),
    [pathname, JSON.stringify(locales)],
  );

  // 当前是否是默认路由
  const isDefaultLocale = React.useMemo(
    () => defaultLocale[0] === currentLocale[0],
    [defaultLocale, currentLocale],
  );

  // 切换locale的展示数据
  const switchData = React.useMemo(() => {
    const anotherLocale = locales.find(el => el[0] !== currentLocale[0]);
    const switchLabel = anotherLocale[1];
    const switchLink = isDefaultLocale
      ? `/${anotherLocale[0]}${pathname}`
      : pathname.replace(`/${currentLocale[0]}`, '');
    return { switchLabel, switchLink };
  }, [pathname, isDefaultLocale, currentLocale, JSON.stringify(locales)]);

  const currentLangMenus = React.useMemo(
    () => _menus[currentLocale[0]],
    [currentLocale, _menus],
  );

  // 顶部导航
  const navs = React.useMemo(
    () => config.navs?.[currentLocale[0]],
    [currentLocale, JSON.stringify(config.navs)],
  );

  // 菜单项
  const menus = React.useMemo(() => {
    if (!config.navs) {
      return currentLangMenus;
    }
    if (pathname === '/') return [];
    return getMenuByPathname(currentLangMenus, pathname, isDefaultLocale);
  }, [currentLangMenus, config.navs, pathname]);

  // 版本数据
  const versions = React.useMemo(() => {
    if (config.site.versions) {
      return config.site.versions;
    }
    return [{ label: packageVersion }];
  }, []);

  // 当前页面name
  const currentPageName = React.useMemo(
    () => pathname.replace(/\/.*\//, ''),
    [pathname],
  );

  // 当前页面menu数据
  const currentMenu = React.useMemo(
    () => getMenuItemByPageName(menus, currentPageName),
    [menus, currentPageName],
  );

  // 更新标题
  const setTitle = React.useCallback(() => {
    let { title } = config;
    if (currentMenu && currentMenu.title) {
      title = `${currentMenu.title} - ${title}`;
    } else if (config.description) {
      title += ` - ${config.description}`;
    }
    document.title = title;
  }, [config, currentMenu]);

  // 更新页面标题
  React.useEffect(setTitle);

  return (
    <MdocSiteContext.Provider
      value={{
        ...shared,
        locale: {
          current: currentLocale,
          default: defaultLocale,
          ...switchData,
        },
        menus,
        navs,
        versions,
        currentPageName,
      }}
    >
      <SiteTheme />
    </MdocSiteContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

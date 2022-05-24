import React from 'react';
import { createRoot } from 'react-dom/client';
import SiteTheme from 'rcdoc-theme-default';
import { MdocSiteContext } from '@rcdoc/theme';
import * as shared from '@@rcdoc/site-shared';
import { getMenuItemByPageName, getLocaleFromPathname, getMenuByPathname } from './utils';
import usePathname from './hooks/usePathname';

const App = () => {
  const { config, menus: _menus, packageVersion } = shared;

  const { locales } = config;

  const pathname = usePathname({ history: config.site.history });

  // 默认locale
  const defaultLocale = React.useMemo(
    () => (!locales ? false : locales[0]),
    [JSON.stringify(locales)],
  );

  // 当前locale
  const currentLocale = React.useMemo(
    () => (!locales ? [''] : getLocaleFromPathname(pathname, locales)),
    [pathname, JSON.stringify(locales)],
  );

  // 当前是否是默认路由
  const isDefaultLocale = React.useMemo(
    () => (!locales ? true : defaultLocale[0] === currentLocale[0]),
    [defaultLocale, currentLocale],
  );

  // 切换locale的展示数据
  const switchData = React.useMemo(() => {
    if (!locales) return false;
    const anotherLocale = locales.find((el) => el[0] !== currentLocale[0]);
    const switchLabel = anotherLocale[1];
    const switchLink = isDefaultLocale
      ? `/${anotherLocale[0]}${pathname}`
      : pathname.replace(`/${currentLocale[0]}`, '');
    return { switchLabel, switchLink };
  }, [pathname, isDefaultLocale, currentLocale, JSON.stringify(locales)]);

  // 是否有多语言menu数据
  // const hasLocaleMenu = React.useMemo(() => Object.keys(_menus).length > 1, [_menus]);

  // 当前语言目录数据
  const currentLangMenus = React.useMemo(() => _menus[currentLocale[0]], [currentLocale, _menus]);

  // 顶部导航
  const navs = React.useMemo(() => {
    if (!config.navs) return false;
    if (locales) {
      if (Array.isArray(config.navs)) {
        console.error('[MDOC ERROR] locale mode config.navs should be an object;');
        return config.navs;
      }
      // Expected return
      return config.navs?.[currentLocale[0]];
    }
    const navKeys = Object.keys(config.navs);
    if (!Array.isArray(config.navs) && navKeys.length) {
      console.error('[MDOC ERROR] config.navs should be an array;');
      return config.navs[navKeys[0]];
    }
    return config.navs;
  }, [currentLocale, JSON.stringify(config.navs)]);

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
    if (!config.site?.versions) return false;
    if (Array.isArray(config.site?.versions)) {
      return config.site.versions;
    }
    return [{ label: packageVersion }];
  }, []);

  // 当前页面name
  const currentPageName = React.useMemo(() => pathname.replace(/\/.*\//, ''), [pathname]);

  // 当前页面menu数据
  const currentMenu = React.useMemo(() => getMenuItemByPageName(menus, pathname), [menus]);

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
        locale: !locales
          ? false
          : {
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

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);

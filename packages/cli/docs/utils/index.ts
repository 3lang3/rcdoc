/**
 * Get menu item buy page name
 * @param {*} arr
 * @param {*} str
 * @returns
 */
export function getMenuItemByPageName(arr, str) {
  let target;
  function search(el) {
    if (el.langPath && el.langPath.endsWith(str.toLowerCase())) {
      target = el;
      return true;
    }
    if (el.children && el.children.length) {
      el.children.some(search);
    }
  }
  arr.some(search);
  return target;
}

/**
 * Get locale from pathname
 * @param {*} pathname
 * @param {*} locales
 * @returns
 */
export function getLocaleFromPathname(pathname, locales) {
  const currentLang = pathname.split('/')[1];
  const idx = locales.findIndex((el) => el[0] === currentLang);
  if (idx !== -1) {
    return locales[idx];
  }
  return locales[0];
}

/**
 * Get menu item by pathname
 * @param {*} menu
 * @param {*} pathname
 * @param {*} isDefaultLang
 * @returns
 */
export function getMenuByPathname(menu = [], pathname, isDefaultLang) {
  const paths = pathname.substr(1).split('/').filter(Boolean);
  const parentPath = '/' + paths[isDefaultLang ? 0 : 1];
  return menu.filter((el) => el.path.startsWith(parentPath));
}

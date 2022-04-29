import slash from 'slash2';
import { smartOutputFile } from '../common';
import { SITE_SHARED_MENU_FILE } from '../common/constant';

// 导出所有文档
function genExportMenus(items) {
  return `${JSON.stringify(items, null, 2)}`;
}

export async function genSiteMenuShared(menus) {
  const code = `
export default ${genExportMenus(menus)}
`;
  smartOutputFile(SITE_SHARED_MENU_FILE, slash(code));
}

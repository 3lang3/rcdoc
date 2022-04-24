import { smartOutputFile } from '../common';
import { SITE_SHARED_MENU_FILE } from '../common/constant';

// 导出所有文档
function genExportMenus(items) {
  return `${JSON.stringify(items, null, 2)}`;
}

export async function genSiteMenuShared(menus) {
  console.log('generator menu json');
  const code = `
${genExportMenus(menus)}
`;
  smartOutputFile(SITE_SHARED_MENU_FILE, code);
}

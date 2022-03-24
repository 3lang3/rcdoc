import path from 'path';
import glob from 'fast-glob';
import {
  smartOutputFile,
} from '../common';
import {
  PROJECT_SRC_DIR,
  SITE_SHARED_API_FILE,
} from '../common/constant';

// 导出所有文档
function genExportApi() {
  const componentMenus = glob.sync(path.normalize(path.join(PROJECT_SRC_DIR, '**/*.md'))).map((filePath) => {

  });

  return  ''
}

export async function genSiteApiShared() {
  const code = `
${genExportApi()}
`;
  smartOutputFile(SITE_SHARED_API_FILE, code);
}

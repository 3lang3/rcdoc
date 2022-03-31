import {
  smartOutputFile,
} from '../common';
import {
  SITE_SHARED_ROUTES_FILE,
} from '../common/constant';

function genExportRoutes(items) {
  return `import React from 'react';
export default [
  ${items.map(({ component, path, lang, title, isComponentDir, redirect }) => (`{ path: '${path}', lang: '${lang}', title: '${title}', isComponentDir: ${isComponentDir || '""'}, component: ${component}, redirect: ${redirect ? `'${redirect}'` : false} }`)).join(',\n  ')}
]`;
}

export async function genSiteRoutesShared(routes) {
  const code = `
${genExportRoutes(routes)}
`;
  smartOutputFile(SITE_SHARED_ROUTES_FILE, code);
}

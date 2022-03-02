import {
  smartOutputFile,
} from '../common';
import {
  SITE_SHARED_ROUTES_FILE,
} from '../common/constant';

function genExportRoutes(items) {
  return `import React from 'react';
export default [
  ${items.map(({ loadable, path, lang, title }) => (`{ path: '${path}', lang: '${lang}', title: '${title}', loadable: ${loadable} }`)).join(',\n  ')}
]`;
}

export async function genSiteRoutesShared(flattenMenus) {
  const code = `
${genExportRoutes(flattenMenus)}
`;
  smartOutputFile(SITE_SHARED_ROUTES_FILE, code);
}

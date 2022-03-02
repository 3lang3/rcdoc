/**
 * cli build site
 */

import fse from 'fs-extra';
import { setNodeEnv } from '../common';
import { PROJECT_SITE_DIST_DIR } from '../common/constant';
import { compileSite } from '../compiler/compile-site';
import { resolveConfig } from '../compiler/resolve-config';

export async function buildSite() {
  setNodeEnv('production');
  await fse.emptyDir(PROJECT_SITE_DIST_DIR);
  await resolveConfig();
  await compileSite(true);
}

/**
 * cli build site
 */

import fse from 'fs-extra';
import { setNodeEnv } from '../common';
import { PROJECT_SITE_DIST_DIR } from '../common/constant';

export async function buildSite() {
  setNodeEnv('production');
  await fse.emptyDir(PROJECT_SITE_DIST_DIR);
}

/**
 * cli clean
 */

import { remove } from 'fs-extra';
import { PROJECT_DIST_DIR, PROJECT_SITE_DIST_DIR } from '../common/constant';

export async function cleanProjectDistDir() {
  await remove(PROJECT_DIST_DIR)
}
export async function cleanProjectSiteDir() {
  await remove(PROJECT_SITE_DIST_DIR)
}

export async function clean() {
  await Promise.all([
    cleanProjectDistDir(),
    cleanProjectSiteDir(),
  ]);
}

/**
 * cli dev
 */
 import { remove } from 'fs-extra';
 import { PROJECT_CLI_DIST_DIR } from '../common/constant'; 
import { setNodeEnv } from '../common';
import { compileSite } from '../compiler/compile-site';
import { resolveConfig } from '../compiler/resolve-config';


export async function dev() {
  setNodeEnv('development');
  await remove(PROJECT_CLI_DIST_DIR)
  await resolveConfig();
  await compileSite();
}

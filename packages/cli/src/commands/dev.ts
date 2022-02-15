/**
 * cli dev
 */

import { setNodeEnv } from '../common';
import { compileSite } from '../compiler/compile-site';
import { resolveConfig } from '../compiler/resolve-config';

export async function dev() {
  setNodeEnv('development');
  const userConfig = await resolveConfig();
  await compileSite(userConfig.data);
}

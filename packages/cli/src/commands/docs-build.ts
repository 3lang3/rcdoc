/**
 * cli build site
 */
import fse from 'fs-extra';
import { setNodeEnv } from '../common';
import { PROJECT_SITE_DIST_DIR } from '../common/constant';
import context from '../common/context';
import { compileSite } from '../compiler/compile-site';
import { genSitemap } from '../compiler/gen-sitemap';
import { resolveConfig } from '../compiler/resolve-config';

export async function docsBuild() {
  setNodeEnv('production');
  await fse.emptyDir(PROJECT_SITE_DIST_DIR);
  await resolveConfig();
  await compileSite(true);

  if (context.opts?.site?.sitemap) {
    await genSitemap();
  }
}

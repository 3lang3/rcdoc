/**
 * cli build
 */
import { remove } from 'fs-extra';
import { build as viteBuild } from 'vite'
import { PROJECT_DIST_DIR, PROJECT_ES_DIR, PROJECT_CJS_DIR } from '../common/constant';
import { getViteConfigForPackage } from '../config/vite.package';

const compileBundles = async () => {
  const configs = [
    getViteConfigForPackage({ outputDir: PROJECT_ES_DIR, format: 'es' }),
    getViteConfigForPackage({ outputDir: PROJECT_CJS_DIR, format: 'cjs' }),
    getViteConfigForPackage({ outputDir: PROJECT_DIST_DIR, minify: true, format: 'umd' }),
    getViteConfigForPackage({ outputDir: PROJECT_DIST_DIR, format: 'umd' }),
  ]

  Promise.all(configs.map(async cfg => await viteBuild(cfg)))
}

export async function build() {
  await remove(PROJECT_DIST_DIR)
  await compileBundles()
}

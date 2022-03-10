/**
 * cli build
 */
import { remove } from 'fs-extra';
import mdocBuild from '@mdoc/build';
import { build as viteBuild } from 'vite'
import { PROJECT_DIST_DIR, PROJECT_ES_DIR, PROJECT_CJS_DIR, MDOC_BUILD_CONFIG_FILE, ROOT } from '../common/constant';
import { getViteConfigForPackage } from '../config/vite.package';

// Vitejs build bundles
// Postcss can't output every component style file.
// fallback1: https://github.com/cutterbl/vitejs-plugin-inject-css/blob/master/src/index.js
// fallback2: https://github.com/wxsms/vite-plugin-libcss/blob/master/index.js
// fallback3: glup workflow https://juejin.cn/post/6962088402174869517#heading-4

const compileBundlesByVite = async () => {
  const configs = [
    // getViteConfigForPackage({ outputDir: PROJECT_ES_DIR, format: 'es' }),
    // getViteConfigForPackage({ outputDir: PROJECT_CJS_DIR, format: 'cjs' }),
    getViteConfigForPackage({ outputDir: PROJECT_DIST_DIR, minify: true, format: 'umd' }),
    getViteConfigForPackage({ outputDir: PROJECT_DIST_DIR, format: 'umd' }),
  ]

  Promise.all(configs.map(async cfg => await viteBuild(cfg)))
}

const compileBundlesByMdocBuild = async () => {
  await mdocBuild['default']({ cwd: ROOT, buildArgs: { config: MDOC_BUILD_CONFIG_FILE } })
}

export async function build() {
  await remove(PROJECT_DIST_DIR)
  await compileBundlesByMdocBuild()
  await compileBundlesByVite()
}

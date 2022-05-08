/**
 * cli build
 */
import path from 'path';
import { remove } from 'fs-extra';
import rcdocBuild from '@rcdoc/build';
import { build as viteBuild } from 'vite';
import { PROJECT_DIST_DIR, MDOC_BUILD_CONFIG_FILE, ROOT } from '../common/constant';
import { getViteConfigForPackage } from '../config/vite.package';
import context from '../common/context';
import { resolveConfig } from '../compiler/resolve-config';
import chalk from 'chalk';

// Vitejs build bundles
// Postcss can't output every component style file.
// fallback1: https://github.com/cutterbl/vitejs-plugin-inject-css/blob/master/src/index.js
// fallback2: https://github.com/wxsms/vite-plugin-libcss/blob/master/index.js
// fallback3: glup workflow https://juejin.cn/post/6962088402174869517#heading-4

const compileBundlesByVite = async () => {
  const { bundleDir = '' } = context.opts?.build;
  const viteBundleDir = path.join(PROJECT_DIST_DIR, bundleDir);
  const configs = [
    getViteConfigForPackage({ outputDir: viteBundleDir, format: 'es' }),
    getViteConfigForPackage({ outputDir: viteBundleDir, minify: true, format: 'umd' }),
    getViteConfigForPackage({ outputDir: viteBundleDir, format: 'umd' }),
  ];
  await Promise.all(configs.map(async (cfg) => await viteBuild(cfg)));
};

const compileBundlesByMdocBuild = async () => {
  const { build: buildProps = {} } = context.opts;
  await rcdocBuild['default']({
    cwd: ROOT,
    clean: false,
    needTransform: false,
    buildArgs: { config: MDOC_BUILD_CONFIG_FILE, ...buildProps },
  });
};

export function build() {
  console.log(`${chalk.green('[rcdoc cli]:')} build start`);
  console.log(`${chalk.gray('[rcdoc cli]:')} clean dist dir...`);
  remove(PROJECT_DIST_DIR, async () => {
    await resolveConfig();
    console.log(`${chalk.gray('[rcdoc cli]:')} vite bundle building...`);
    await compileBundlesByVite();
    console.log(`${chalk.gray('[rcdoc cli]:')} babel transform ...`);
    await compileBundlesByMdocBuild();
    console.log(`${chalk.green('[rcdoc cli]:')} build done!`);
  });
}

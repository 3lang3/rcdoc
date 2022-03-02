import chalk from 'chalk';
import { createRequire } from 'module';
import { createServer, build } from 'vite';
import { getViteConfigForSiteDev, getViteConfigForSiteProd } from '../config/vite.site';
import { mergeCustomViteConfig, replaceExt } from '../common';
import { PACKAGE_STYLE_FILE } from '../common/constant';
import { genStyleDepsMap } from './gen-style-deps-map';
import { genPackageStyle } from './gen-package-style';
import { genSiteDesktopShared } from './gen-site-shared';
import { getCssLang } from '../common/css';
import { watchSiteShared } from './watch-site-shared';

export async function genSiteEntry(): Promise<void> {
  const CSS_LANG = getCssLang();
  return new Promise((resolve, reject) => {
    genStyleDepsMap()
      .then(() => {
        genPackageStyle({ outputPath: replaceExt(PACKAGE_STYLE_FILE, `.${CSS_LANG}`) })
        genSiteDesktopShared();
        resolve();
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

export async function compileSite(production = false) {
  await genSiteEntry();
  if (production) {
    const config = mergeCustomViteConfig(getViteConfigForSiteProd());
    await build(config);
  } else {
    const config = mergeCustomViteConfig(getViteConfigForSiteDev());
    const server = await createServer(config);
    await server.listen();

    await watchSiteShared()

    const require = createRequire(import.meta.url);
    const { version } = require('vite/package.json');
    const viteInfo = chalk.cyan(`vite v${version}`);
    console.log(`\n  ${viteInfo}${chalk.green(` dev server running at:\n`)}`);
    server.printUrls();
  }
}

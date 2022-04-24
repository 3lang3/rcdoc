import chalk from 'chalk';
import { createRequire } from 'module';
import { createServer, build } from 'vite';
import { getViteConfigForSiteDev, getViteConfigForSiteProd } from '../config/vite.site';
import { mergeCustomViteConfig, replaceExt } from '../common';
import { PACKAGE_STYLE_FILE, SITE_SRC_DIR } from '../common/constant';
import { genStyleDepsMap } from './gen-style-deps-map';
import { genPackageStyle } from './gen-package-style';
import { genSiteDesktopShared } from './gen-site-shared';
import { getCssLang } from '../common/css';
import { watchSiteShared } from './watch-site-shared';
import context, { updateServer } from '../common/context';
import { signit } from '../common/sigint';
import { watchConfig } from './watch-config';
import genSiteCustomComponent from './gen-custom-component';

export async function genSiteEntry(): Promise<void> {
  const CSS_LANG = getCssLang();
  return new Promise(async (resolve, reject) => {
    try {
      if (context.opts.site.injectComponentCss) {
        await genStyleDepsMap();
        genPackageStyle({ outputPath: replaceExt(PACKAGE_STYLE_FILE, `.${CSS_LANG}`) });
      }
      genSiteDesktopShared();
      genSiteCustomComponent();
      resolve();
    } catch (error) {
      reject(error);
    }
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

    updateServer(server);

    await server.listen();

    watchSiteShared();
    watchConfig();

    signit();

    const require = createRequire(import.meta.url);
    const { version } = require('vite/package.json');
    const viteInfo = chalk.cyan(`vite v${version}`);
    console.log(`\n  ${viteInfo}${chalk.green(` dev server running at:\n`)}`);
    server.printUrls();
  }
}

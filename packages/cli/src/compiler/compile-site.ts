import chalk from 'chalk';
import { createRequire } from 'module';
import { createServer, build } from 'vite';
import { getViteConfigForSiteDev, getViteConfigForSiteProd } from '../config/vite.site';
import { mergeCustomViteConfig } from '../common';
import { genSiteDesktopShared } from './gen-site-shared';

export async function genSiteEntry(userConfig): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      await genSiteDesktopShared(userConfig)
      resolve()
    } catch (error) {
      reject(error)
    }
  });
}

export async function compileSite(userConfig, production = false) {
  await genSiteEntry(userConfig);
  if (production) {
    const config = await mergeCustomViteConfig(userConfig, await getViteConfigForSiteProd(userConfig));
    await build(config);
  } else {
    const config = await mergeCustomViteConfig(userConfig, await getViteConfigForSiteDev(userConfig));
    const server = await createServer(config);
    await server.listen();

    const require = createRequire(import.meta.url);
    const { version } = require('vite/package.json');
    const viteInfo = chalk.cyan(`vite v${version}`);
    console.log(`\n  ${viteInfo}${chalk.green(` dev server running at:\n`)}`);
    server.printUrls();
  }
}

import chalk from 'chalk';
import { createRequire } from 'module';
import { createServer, build } from 'vite';
import { getViteConfigForSiteDev, getViteConfigForSiteProd } from '../config/vite.site';
import { mergeCustomViteConfig } from '../common';
import { genSiteDesktopShared } from './gen-site-shared';

export async function genSiteEntry(): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      genSiteDesktopShared()
      resolve()
    } catch (error) {
      reject(error)
    }
  });
}

export async function compileSite(production = false) {
  await genSiteEntry();
  if (production) {
    const config = await mergeCustomViteConfig(await getViteConfigForSiteProd());
    await build(config);
  } else {
    const config = await mergeCustomViteConfig(await getViteConfigForSiteDev());
    const server = await createServer(config);
    await server.listen();

    const require = createRequire(import.meta.url);
    const { version } = require('vite/package.json');
    const viteInfo = chalk.cyan(`vite v${version}`);
    console.log(`\n  ${viteInfo}${chalk.green(` dev server running at:\n`)}`);
    server.printUrls();
  }
}

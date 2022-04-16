import fse from 'fs-extra';
import path from 'path';
import { SitemapStream } from 'sitemap';
import { PROJECT_SITE_DIST_DIR, SITE_SHARED_MENU_FILE } from '../common/constant';
import context from '../common/context';
import type { MenuItem } from './gen-site-menu';

export async function genSitemap() {
  const { hostname, exclude = [] } = context?.opts?.site?.algolia?.sitemap;
  const smis = new SitemapStream({
    hostname,
    xmlns: { video: false, image: false, news: false, xhtml: false },
  });
  console.log(hostname);
  const menuJson = fse.readJSONSync(SITE_SHARED_MENU_FILE, 'utf-8');
  const excludes = ['/404'].concat(exclude);
  const writeStream = fse.createWriteStream(path.join(PROJECT_SITE_DIST_DIR, 'sitemap.xml'));

  const routes = getAllMenuByJson(menuJson);

  smis.pipe(writeStream);

  routes.forEach((route) => {
    if (
      // ignore specific paths
      !excludes.includes(route) &&
      // ignore dynamic route, such as /~demos/:uuid
      !route.includes('~')
    ) {
      smis.write({ url: route });
    }
  });

  smis.end();
  await new Promise((resolve) => writeStream.on('close', resolve));
  console.info('sitemap.xml generated successfully!');
}

function getAllMenuByJson(menuJson: Record<string, MenuItem[]>) {
  const menuValues = Object.values(menuJson).reduce((acc, cur) => acc.concat(cur), []);

  const routes: string[] = [];
  function search(menu: MenuItem) {
    if (Array.isArray(menu.children)) {
      menu.children.forEach(search);
    } else {
      routes.push(menu.langPath || menu.path);
    }
  }

  menuValues.forEach(search);

  return routes;
}

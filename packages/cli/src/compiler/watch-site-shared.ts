import path from 'path'
import fse from 'fs-extra'
import watch from 'node-watch'
import { PROJECT_SRC_DIR, SITE_SHARED_MENU_FILE } from '../common/constant';
import { getHeadingsAndFrontmatter } from '../common/markdown'
import { smartOutputFile } from '../common';

export function watchSiteShared() {
  watch(path.join(PROJECT_SRC_DIR), { recursive: true, filter: /\.md$/ }, async (eventType, filePath) => {
    if (eventType !== 'update') return;
    let needUpdate = false
    const { headings, frontmatter } = getHeadingsAndFrontmatter(filePath);
    const updateTitle = frontmatter?.title || headings?.[0]
    const menus = fse.readJSONSync(SITE_SHARED_MENU_FILE)
    Object.keys(menus).forEach((lang) => {
      const routes = menus[lang];
      function search(route) {
        if (route.filePath === filePath) {
          if (route.title !== updateTitle) {
            route.title = updateTitle
            needUpdate = true
          }
          return
        }
        if (route.children) {
          route.children.forEach(search)
        }
      }
      routes.forEach(search)
    })
    if (needUpdate) {
      smartOutputFile(SITE_SHARED_MENU_FILE, JSON.stringify(menus))
    }
  })

}
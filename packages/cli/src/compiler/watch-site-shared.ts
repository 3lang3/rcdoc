import path from 'path'
import fse from 'fs-extra'
import watch from 'node-watch'
import { PROJECT_SRC_DIR, SITE_SHARED_MENU_FILE } from '../common/constant';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown'
import { smartOutputFile } from '../common';

export function watchSiteShared() {
  // Watch all md file
  watch(path.join(PROJECT_SRC_DIR), { recursive: true, filter: /\.md$/ }, async (eventType, filePath) => {
    if (eventType !== 'update') return;
    let needUpdate = false
    // Get new title
    const { headings, frontmatter } = getMarkdownContentMeta(filePath);
    const { title } = getTitleAndLangByFilepath(filePath);
    const updateTitle = frontmatter?.title || headings?.[0] || title;
    
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
      // Update shared file
      smartOutputFile(SITE_SHARED_MENU_FILE, JSON.stringify(menus))
    }
  })

}
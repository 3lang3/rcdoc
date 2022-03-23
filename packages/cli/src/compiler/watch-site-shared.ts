import path from 'path';
import fse from 'fs-extra'
import chokidar from 'chokidar'
import { PROJECT_SRC_DIR, PROJECT_DOCS_DIR, SITE_SHARED_MENU_FILE } from '../common/constant';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown'
import { smartOutputFile } from '../common';
import context from '../common/context';

export function watchSiteShared() {
  // Watch all md file
  const watcher = chokidar.watch([path.join(PROJECT_SRC_DIR, '**/*.md'), path.join(PROJECT_DOCS_DIR, '**/*.md')])

  watcher.on('change', async (filePath) => {
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
          // Update title
          if (route.title !== updateTitle) {
            route.title = updateTitle
            needUpdate = true
          }
          // Update frontmatter data
          if (frontmatter.group && route.group !== frontmatter.group) {
            route.group = frontmatter.group
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

  context.closes.push(() => watcher.close())
}
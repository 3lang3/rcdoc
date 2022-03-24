import path from 'path';
import fse from 'fs-extra'
import chokidar from 'chokidar'
import { PROJECT_SRC_DIR, PROJECT_DOCS_DIR, SITE_SHARED_MENU_FILE } from '../common/constant';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown'
import { getExistFile, smartOutputFile } from '../common';
import context from '../common/context';
import apiParser from './compile-api';

export function watchSiteShared() {
  // Watch all md file
  const watcher = chokidar.watch([path.join(PROJECT_SRC_DIR, '**/*.md'), path.join(PROJECT_DOCS_DIR, '**/*.md')])

  watcher.on('change', async (filePath) => {
    updateMenuFile(filePath)
  })

  context.closes.push(() => watcher.close())
}

// Update menu file
function updateMenuFile(filePath: string) {
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
}

function updateApiFile(filePath: string) {
  const { dir } = path.parse(filePath);
  const content = fse.readFileSync(filePath, 'utf-8');
  const results = [...content.matchAll(/<API(.*)>/g)]
  // has api tag
  if (results.some(r => r[0])) {
    // collection unique src
    const srcs = [...new Set(results.map(r => parseSrc(r[1], dir)))]
    console.log(srcs)
  }
}

const GUESS_INDEX_PATH = ['index.ts', 'index.js', 'index.tsx', 'index.jsx']

function parseSrc(str: string, dir) {
  if (!str || !str.trim()) {
    return getExistFile({ files: GUESS_INDEX_PATH.map(el => path.join(dir, el)) })
  }
  const [, src] = str.match(/src=(?:'|")(.*)(?:'|")/)
  return src
}
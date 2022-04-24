import path from 'path';
import chokidar from 'chokidar';
import { SITE_SHARED_MENU_FILE, CWD } from '../common/constant';
import { getMarkdownContentMeta, getTitleAndLangByFilepath } from '../common/markdown';
import context from '../common/context';
import { genSiteMenuShared } from './gen-site-menu-shared';
import { restart } from '../common/restart';
import { resolveJsFile } from '../common';

export function watchSiteShared() {
  // Watch all md file
  const watcher = chokidar.watch(
    context.opts.resolve.includes.map((p) => path.join(CWD, p, '**/*.md')),
    {
      ignored: (context.opts.resolve.excludes = []),
      ignoreInitial: true,
    },
  );

  watcher
    .on('change', async (filePath) => {
      await updateMenuFile(filePath);
    })
    .on('add', async (filePath) => {
      watcher.add(filePath);
      await restart();
    })
    .on('unlink', async (filePath) => {
      watcher.unwatch(filePath);
      await restart();
    });

  context.watchers.push(watcher);
}

// Update menu file
async function updateMenuFile(filePath: string) {
  let needUpdate = false;
  // Get new title
  const { headings, frontmatter } = getMarkdownContentMeta(filePath);
  const { title } = getTitleAndLangByFilepath(filePath);
  const updateTitle = frontmatter?.title || headings?.[0] || title;
  const menus = await resolveJsFile(SITE_SHARED_MENU_FILE);

  Object.keys(menus).forEach((lang) => {
    const routes = menus[lang];
    function search(route) {
      if (route.filePath === filePath) {
        // Update title
        if (route.title !== updateTitle) {
          route.title = updateTitle;
          needUpdate = true;
        }
        // Update frontmatter data
        if (frontmatter.group && route.group !== frontmatter.group) {
          route.group = frontmatter.group;
          needUpdate = true;
        }
        return;
      }
      if (route.children) {
        route.children.forEach(search);
      }
    }
    routes.forEach(search);
  });

  if (needUpdate) {
    // Update shared file
    genSiteMenuShared(menus);
  }
}

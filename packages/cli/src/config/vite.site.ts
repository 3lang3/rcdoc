import { join } from 'path';
import slash from 'slash2';
import { get } from 'lodash-es';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { InlineConfig } from 'vite';
import mdoc from 'vite-plugin-react-mdoc';
import { setBuildTarget, isDev } from '../common';
import {
  PROJECT_SITE_DIST_DIR,
  SITE_SHARED_FILE,
  PROJECT_SRC_DIR,
  SITE_SRC_DIR,
  getPackageJson,
  ROOT,
} from '../common/constant';
import { getConfigThemeAlias } from '../common'
import context from '../common/context';

function getTitle(config: { title?: string; description?: string }) {
  let { title } = config;

  if (config.description) {
    title += ` - ${config.description}`;
  }

  return title;
}

function getHTMLMeta(vantConfig: any) {
  const meta = get(vantConfig, 'site.htmlMeta');

  if (meta) {
    return Object.keys(meta)
      .map((key) => `<meta name="${key}" content="${meta[key]}">`)
      .join('\n');
  }

  return '';
}

export function getViteConfigForSiteDev(): InlineConfig {
  setBuildTarget('site');

  const projectPackageJson = getPackageJson();
  const title = getTitle(context.opts);
  const baiduAnalytics = get(context.opts, 'site.baiduAnalytics');
  const exportDemos = get(context.opts, 'exportDemos', false);
  const enableVConsole = isDev() && get(context.opts, 'site.enableVConsole');
  const themeAlias = getConfigThemeAlias();
  // @hack
  // enforce alias redirect to not root dir
  const projectDepsAlias = Object.keys(projectPackageJson.dependencies).reduce((a, v) => {
    a[v] = slash(join(ROOT, 'node_modules', v));
    return a;
  }, {});

  return {
    base: './',
    root: SITE_SRC_DIR,
    plugins: [
      react() as any,
      mdoc({
        apiParser: true,
        demos: exportDemos,
        replaceHtml: (JSX) => {
          const group = JSX.replace(/(<h3\s+id=)/g, ':::$1')
            .replace(/<h2/g, ':::<h2')
            .split(':::');

          const ne = group
            .map((fragment) => {
              if (fragment.indexOf('<h3') !== -1) {
                return `<div className="van-doc-card">${fragment}</div>`;
              }

              return fragment;
            })
            .join('');

          return ne;
        },
      }) as any,
      createHtmlPlugin({
        inject: {
          data: {
            ...context.opts,
            title,
            baiduAnalytics,
            enableVConsole,
            meta: getHTMLMeta(context.opts),
          },
        }
      }),
    ],
    resolve: {
      alias: {
        [projectPackageJson.name]: PROJECT_SRC_DIR,
        'site-shared': SITE_SHARED_FILE,
        ...projectDepsAlias,
        ...themeAlias,
      },
    },
    optimizeDeps: {
      entries: [join(SITE_SRC_DIR, 'index.html'), join(PROJECT_SRC_DIR, 'index.ts')],
    },
    server: {
      port: 4000,
    },
  };
}

export function getViteConfigForSiteProd(): InlineConfig {
  const devConfig = getViteConfigForSiteDev();
  const outDir = get(context.opts, 'build.site.outputDir', PROJECT_SITE_DIST_DIR);
  const publicPath = get(context.opts, 'build.site.publicPath', '/');

  return {
    ...devConfig,
    base: publicPath,
    build: {
      outDir,
      brotliSize: false,
      emptyOutDir: true,
      cssTarget: ['chrome53'],
      rollupOptions: {
        input: {
          main: join(SITE_SRC_DIR, 'index.html')
        },
      },
    },
  };
}

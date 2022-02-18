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
import { getConfigThemeAlias } from './theme'

function getSiteConfig(vantConfig: any) {
  const siteConfig = vantConfig.site;

  if (siteConfig.locales) {
    return siteConfig.locales[siteConfig.defaultLang || 'en-US'];
  }

  return siteConfig;
}

function getTitle(config: { title: string; description?: string }) {
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

export async function getViteConfigForSiteDev(userConfig): Promise<InlineConfig> {
  setBuildTarget('site');

  const projectPackageJson = getPackageJson();
  const title = getTitle(userConfig);
  const baiduAnalytics = get(userConfig, 'site.baiduAnalytics');
  const exportDemos = get(userConfig, 'exportDemos', false);
  const enableVConsole = isDev() && get(userConfig, 'site.enableVConsole');
  const themeAlias = getConfigThemeAlias(userConfig);
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
            ...userConfig,
            title,
            baiduAnalytics,
            enableVConsole,
            meta: getHTMLMeta(userConfig),
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

export async function getViteConfigForSiteProd(userConfig): Promise<InlineConfig> {
  const devConfig = getViteConfigForSiteDev(userConfig);
  const outDir = get(userConfig, 'build.site.outputDir', PROJECT_SITE_DIST_DIR);
  const publicPath = get(userConfig, 'build.site.publicPath', '/');

  return {
    ...devConfig,
    base: publicPath,
    build: {
      outDir,
      brotliSize: false,
      emptyOutDir: true,
      // https://github.com/youzan/vant/issues/9703
      cssTarget: ['chrome53'],
      rollupOptions: {
        input: {
          main: join(PROJECT_SITE_DIST_DIR, 'index.html')
        },
      },
    },
  };
}

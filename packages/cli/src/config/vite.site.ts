import { join } from 'path';
import slash from 'slash2';
import { get } from 'lodash-es';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { InlineConfig } from 'vite';
import mdoc from 'vite-plugin-react-mdoc';
import { setBuildTarget, getMdocConfig, isDev } from '../common';
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

export async function getViteConfigForSiteDev(): Promise<InlineConfig> {
  setBuildTarget('site');

  const projectPackageJson = getPackageJson();
  const vantConfig = await getMdocConfig();
  const siteConfig = getSiteConfig(vantConfig);
  const title = getTitle(siteConfig);
  const baiduAnalytics = get(vantConfig, 'site.baiduAnalytics');
  const enableVConsole = isDev() && get(vantConfig, 'site.enableVConsole');
  const themeAlias = getConfigThemeAlias(vantConfig);
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
        codeBlockOutput: ['independent'],
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
            ...siteConfig,
            title,
            baiduAnalytics,
            enableVConsole,
            meta: getHTMLMeta(vantConfig),
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

export async function getViteConfigForSiteProd(): Promise<InlineConfig> {
  const devConfig = getViteConfigForSiteDev();
  const vantConfig = await getMdocConfig();
  const outDir = get(vantConfig, 'build.site.outputDir', PROJECT_SITE_DIST_DIR);
  const publicPath = get(vantConfig, 'build.site.publicPath', '/');

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

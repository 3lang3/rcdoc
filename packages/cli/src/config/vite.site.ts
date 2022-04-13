import path from 'path';
import slash from 'slash2';
import { get } from 'lodash-es';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { InlineConfig } from 'vite';
import mdParser from '@rcdoc/vitejs-plugin';
import { isObject, setBuildTarget } from '../common';
import {
  PROJECT_SITE_DIST_DIR,
  PROJECT_SRC_DIR,
  SITE_SRC_DIR,
  getPackageJson,
  ROOT,
  PROJECT_CLI_DIST_DIR,
  CWD,
} from '../common/constant';
import { getConfigThemeAlias } from '../common';
import context from '../common/context';
import type { DefineConfig } from '../common/defineConfig';

function getTitle(config: DefineConfig) {
  let { title } = config;

  if (config.description) {
    title += ` - ${config.description}`;
  }

  return title;
}

function getHTMLMetas(metas: DefineConfig['site']['metas']) {
  if (Array.isArray(metas)) {
    return metas.map((meta) => `<meta name="${meta.name}" content="${meta.content}">`).join('\n');
  }
  return '';
}

function getHTMLHeadScripts(scripts: DefineConfig['site']['headScripts']) {
  if (Array.isArray(scripts)) {
    return scripts
      .map((script) => {
        if (typeof script === 'string') {
          if (/^(https?:)?\/\//.test(script)) return `<script src="${script}"></script>`;
          return `<script>${script}</script>`;
        }
        if (isObject(script)) return script.toString();
        return '';
      })
      .join('\n');
  }
  return '';
}

export function getViteConfigForSiteDev(): InlineConfig {
  setBuildTarget('site');

  const projectPackageJson = getPackageJson();
  const title = getTitle(context.opts);
  const themeAlias = getConfigThemeAlias();

  return {
    base: './',
    root: SITE_SRC_DIR,
    publicDir: path.join(CWD, context.opts?.vite?.publicDir || 'public'),
    plugins: [
      react(),
      mdParser({
        passivePreview: context.opts.resolve?.passivePreview,
        previewLangs: context.opts.resolve?.previewLangs,
      }) as any,
      createHtmlPlugin({
        inject: {
          data: {
            title,
            description: context.opts.description,
            logo: context.opts.logo,
            favicon: context.opts.site?.favicon,
            vconsole: context.opts?.site?.vconsole,
            metas: getHTMLMetas(context.opts?.site?.metas),
            headScripts: getHTMLHeadScripts(context.opts?.site?.headScripts),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        ...themeAlias,
        [projectPackageJson.name]: PROJECT_SRC_DIR,
        '@@rcdoc': PROJECT_CLI_DIST_DIR,
      },
    },
    optimizeDeps: {
      ...context.opts?.vite?.optimizeDeps,
      entries: [
        path.join(SITE_SRC_DIR, 'index.html'),
        path.join(PROJECT_SRC_DIR, 'index.ts'),
        ...(context.opts?.vite?.optimizeDeps?.entries || []),
      ],
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

  const projectPackageJson = getPackageJson();
  // @hack
  // enforce alias redirect to not root dir in docs:build
  const projectDepsAlias = Object.keys(projectPackageJson.dependencies).reduce((a, v) => {
    a[v] = slash(path.join(ROOT, 'node_modules', v));
    return a;
  }, {});

  const themeAlias = getConfigThemeAlias();

  return {
    ...devConfig,
    base: publicPath,
    resolve: {
      alias: {
        ...projectDepsAlias,
        ...themeAlias,
        [projectPackageJson.name]: PROJECT_SRC_DIR,
        '@@rcdoc': PROJECT_CLI_DIST_DIR,
      },
    },
    build: {
      outDir,
      brotliSize: false,
      emptyOutDir: true,
      cssTarget: ['chrome53'],
      rollupOptions: {
        input: {
          main: path.join(SITE_SRC_DIR, 'index.html'),
        },
      },
    },
  };
}

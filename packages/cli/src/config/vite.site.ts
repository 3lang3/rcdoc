import path from 'path';
import slash from 'slash2';
import { get } from 'lodash-es';
import react from '@rcdoc/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import type { InlineConfig } from 'vite';
import mdParser from '@rcdoc/vitejs-plugin';
import { getEntryPath, isObject, setBuildTarget } from '../common';
import {
  PROJECT_SITE_DIST_DIR,
  SITE_SRC_DIR,
  getPackageJson,
  ROOT,
  PROJECT_CLI_DIST_DIR,
  CWD,
} from '../common/constant';
import { getConfigThemeAlias } from '../common';
import context from '../common/context';
import type { DefineConfig } from '../common/defineConfig';
const projectPackageJson = getPackageJson();

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

const IGNORE_BUILD_ALIAS_DEPS = ['react', 'react-dom', 'react-router-dom', '@rcdoc/cli'];

export function getViteConfigForSiteDev(): InlineConfig {
  setBuildTarget('site');

  const title = getTitle(context.opts);
  const themeAlias = getConfigThemeAlias();

  // @FIXME
  // enforce alias redirect to not root dir
  const projectDepsAlias = Object.keys(projectPackageJson.dependencies || {}).reduce((a, v) => {
    if (!IGNORE_BUILD_ALIAS_DEPS.includes(v)) {
      a[v] = slash(path.join(ROOT, 'node_modules', v));
    }
    return a;
  }, {});

  const entry = getEntryPath();
  return {
    base: context.opts?.vite?.base || './',
    root: SITE_SRC_DIR,
    publicDir: path.join(CWD, context.opts?.vite?.publicDir || 'public'),
    plugins: [
      react({ resolveNodeModules: true }),
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
            routerBase: context.opts?.vite?.base || '/',
            metas: getHTMLMetas(context.opts?.site?.metas),
            headScripts: getHTMLHeadScripts(context.opts?.site?.headScripts),
          },
        },
      }),
    ],
    resolve: {
      alias: {
        ...projectDepsAlias,
        ...themeAlias,
        [projectPackageJson.name]: entry,
        '@@rcdoc': PROJECT_CLI_DIST_DIR,
      },
      dedupe: ['react', 'react-dom'],
    },
    optimizeDeps: {
      ...context.opts?.vite?.optimizeDeps,
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        ...(context.opts?.vite?.optimizeDeps?.include || []),
      ],
      entries: [
        path.join(SITE_SRC_DIR, 'index.html'),
        entry,
        ...(context.opts?.vite?.optimizeDeps?.entries || []),
      ],
    },
    server: {
      port: 4000,
      ...context.opts?.vite?.server,
    },
  };
}

export function getViteConfigForSiteProd(): InlineConfig {
  const devConfig = getViteConfigForSiteDev();
  const outDir = get(context.opts, 'build.site.outputDir', PROJECT_SITE_DIST_DIR);

  return {
    ...devConfig,
    base: context.opts?.vite?.base || '/',
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

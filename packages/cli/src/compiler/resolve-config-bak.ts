import fs from 'fs';
import path from 'path';
import { bundleRequire } from 'bundle-require'
import { pathToFileURL } from 'url'
import { build } from 'esbuild';
import { ROOT, SITE_SHARD_CONFIG_FILE } from '../common/constant';
import { consola } from '../common/logger'
import { normalizePath } from '../common';

export async function resolveConfig() {
  const start = performance.now()
  const getTime = () => `${(performance.now() - start).toFixed(2)}ms`

  let isTS = false;
  let resolvedPath: string | undefined;

  const jsconfigFile = path.resolve(ROOT, 'mdoc.config.js')
  if (fs.existsSync(jsconfigFile)) {
    resolvedPath = jsconfigFile
  }

  if (!resolvedPath) {
    const mjsconfigFile = path.resolve(ROOT, 'mdoc.config.mjs')
    if (fs.existsSync(mjsconfigFile)) {
      resolvedPath = mjsconfigFile
    }
  }

  if (!resolvedPath) {
    const tsconfigFile = path.resolve(ROOT, 'mdoc.config.ts')
    if (fs.existsSync(tsconfigFile)) {
      resolvedPath = tsconfigFile
      isTS = true
    }
  }

  if (!resolvedPath) {
    consola.warn('no config file found.')
    return null
  }

  try {
    let userConfig: any;

    const fileUrl = pathToFileURL(resolvedPath)

    if (isTS) {
      await bundleConfigFile(resolvedPath, true)
    } else {
      fs.copyFileSync(fileUrl, SITE_SHARD_CONFIG_FILE)
    }

    userConfig = (await import(`${SITE_SHARD_CONFIG_FILE}?t=${Date.now()}`))
      .default
    consola.log(`TS + native esm config loaded in ${getTime()}`, fileUrl)

    const config = await (typeof userConfig === 'function'
      ? userConfig()
      : userConfig)
    if (!isObject(config)) {
      throw new Error(`config must export or return an object.`)
    }
    return {
      path: normalizePath(resolvedPath),
      config,
    }
  } catch (e) {
    consola.error(`failed to load config from ${resolvedPath}`)
    throw e
  }
}

async function bundleConfigFile(
  fileName: string,
  isESM = false,
) {
  const result = await build({
    absWorkingDir: ROOT,
    entryPoints: ['mdoc.config.ts'],
    outfile: SITE_SHARD_CONFIG_FILE,
    write: true,
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    sourcemap: false,
    plugins: [
      {
        name: 'externalize-deps',
        setup(build) {
          build.onResolve({ filter: /.*/ }, (args) => {
            const id = args.path
            if (id[0] !== '.' && !path.isAbsolute(id)) {
              return {
                external: true
              }
            }
          })
        }
      },
      {
        name: 'replace-import-meta',
        setup(build) {
          build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
            const contents = await fs.promises.readFile(args.path, 'utf8')
            return {
              loader: args.path.endsWith('.ts') ? 'ts' : 'js',
              contents: contents
                .replace(
                  /\bimport\.meta\.url\b/g,
                  JSON.stringify(`file://${args.path}`)
                )
                .replace(
                  /\b__dirname\b/g,
                  JSON.stringify(path.dirname(args.path))
                )
                .replace(/\b__filename\b/g, JSON.stringify(args.path))
            }
          })
        }
      }
    ]
  })
}

function isObject(value: unknown): value is Record<string, any> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
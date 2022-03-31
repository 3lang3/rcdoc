import fs from 'fs'
import fse from 'fs-extra';
import { merge } from 'lodash-es'
import JoyCon from 'joycon'
import path from 'path'
import { bundleRequire } from 'bundle-require'
import strip from 'strip-json-comments'
import { ROOT, SITE_SHARD_CONFIG_FILE } from '../common/constant'
import type { DefineConfig } from '../common/defineConfig';
import { init } from '../common/context'

const defaultConfig: DefineConfig = {
  locales: [['zh-CN', '中文'], ['en-US', 'English']],
  resolve: {
    previewLangs: ['jsx', 'tsx']
  }
}

function jsoncParse(data: string) {
  try {
    return new Function('return ' + strip(data).trim())()
  } catch {
    // Silently ignore any error
    // That's what tsc/jsonc-parser did after all
    return {}
  }
}


const joycon = new JoyCon()

const loadJson = async (filepath: string) => {
  try {
    return jsoncParse(await fs.promises.readFile(filepath, 'utf8'))
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to parse ${path.relative(ROOT, filepath)}: ${error.message
        }`
      )
    } else {
      throw error
    }
  }
}

const jsonLoader = {
  test: /\.json$/,
  load(filepath: string) {
    return loadJson(filepath)
  },
}

joycon.addLoader(jsonLoader)

export async function resolveConfig(
  cwd: string = ROOT
): Promise<void> {
  const configJoycon = new JoyCon()
  const configPath = await configJoycon.resolve(
    [
      'mdoc.config.ts',
      'mdoc.config.js',
      'mdoc.config.mjs',
      'mdoc.config.json',
    ],
    cwd,
    path.parse(cwd).root
  )

  if (configPath) {
    await parseConfig(configPath)
  }
}

export async function parseConfig(configPath) {
  if (configPath.endsWith('.json')) {
    let data = await loadJson(configPath)
    if (data) {
      init(data, configPath)
      return
    }
  }

  const config = await bundleRequire({
    filepath: configPath,
  })

  const data = config.mod.default || config.mod;

  const mergedData = merge(defaultConfig, data)
  fse.outputFileSync(SITE_SHARD_CONFIG_FILE, JSON.stringify(mergedData, null, 2))

  init(mergedData, configPath)
}
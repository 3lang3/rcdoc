import fs from 'fs'
import JoyCon from 'joycon'
import path from 'path'
import { bundleRequire } from 'bundle-require'
import strip from 'strip-json-comments'
import { ROOT, SITE_SHARD_CONFIG_FILE } from '../common/constant'

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
        `Failed to parse ${path.relative(process.cwd(), filepath)}: ${error.message
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
): Promise<{ path?: string; data?: ReturnType<any> }> {
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
    if (configPath.endsWith('.json')) {
      let data = await loadJson(configPath)
      if (data) {
        return { path: configPath, data }
      }
      return {}
    }

    const config = await bundleRequire({
      filepath: configPath,
    })

    const data = config.mod.default || config.mod
    fs.writeFileSync(SITE_SHARD_CONFIG_FILE, JSON.stringify(data, null, 2), 'utf8')
    return {
      path: configPath,
      data: data,
    }
  }

  return {}
}
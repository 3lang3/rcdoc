import fs from 'fs';
import fse from 'fs-extra';
import { merge } from 'lodash-es';
import JoyCon from 'joycon';
import path from 'path';
import strip from 'strip-json-comments';
import { ROOT, SITE_SHARD_CONFIG_FILE, getPackageJson } from '../common/constant';
import type { DefineConfig } from '../common/defineConfig';
import { init } from '../common/context';
import { getRepoUrl, resolveJsFile } from '../common';

const getPackageJsonRepository = () => {
  const { repository } = getPackageJson();
  return repository || {};
};

const defaultConfig: DefineConfig = {
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  resolve: {
    includes: ['docs', 'src'],
    previewLangs: ['jsx', 'tsx'],
  },
  site: {
    history: 'broswer',
    slug: 'content',
    injectComponentCss: true,
  },
  build: {
    entry: './src',
    style: 'index.less',
  },
  repository: getPackageJsonRepository(),
};

function jsoncParse(data: string) {
  try {
    return new Function('return ' + strip(data).trim())();
  } catch {
    // Silently ignore any error
    // That's what tsc/jsonc-parser did after all
    return {};
  }
}

const joycon = new JoyCon();

const loadJson = async (filepath: string) => {
  try {
    return jsoncParse(await fs.promises.readFile(filepath, 'utf8'));
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse ${path.relative(ROOT, filepath)}: ${error.message}`);
    } else {
      throw error;
    }
  }
};

const jsonLoader = {
  test: /\.json$/,
  load(filepath: string) {
    return loadJson(filepath);
  },
};

joycon.addLoader(jsonLoader);

export async function resolveConfig(cwd: string = ROOT): Promise<void> {
  const configJoycon = new JoyCon();
  const configPath = await configJoycon.resolve(
    ['rcdoc.config.ts', 'rcdoc.config.js', 'rcdoc.config.mjs', 'rcdoc.config.json'],
    cwd,
    path.parse(cwd).root,
  );

  if (configPath) {
    await parseConfig(configPath);
  }
}

export async function parseConfig(configPath) {
  if (configPath.endsWith('.json')) {
    let data = await loadJson(configPath);
    if (data) {
      if (data.repository?.url) {
        data.repository.url = getRepoUrl(data.repository.url, data.repository?.platform);
      }
      init(data, configPath);
      return;
    }
  }

  const data = await resolveJsFile(configPath);
  const mergedData = merge(JSON.parse(JSON.stringify(defaultConfig)), data);

  if (mergedData.repository?.url) {
    mergedData.repository.url = getRepoUrl(
      mergedData.repository.url,
      mergedData.repository?.platform,
    );
  }

  fse.outputFileSync(SITE_SHARD_CONFIG_FILE, JSON.stringify(mergedData, null, 2));

  init(mergedData, configPath);
}

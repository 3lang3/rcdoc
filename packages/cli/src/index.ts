import path from 'path';
import fse from 'fs-extra';
import { dev } from './commands/dev';
import { build } from './commands/build';
import { preview } from './commands/preview';
import { docsBuild } from './commands/docs-build';
import { clean } from './commands/clean';
import { test } from './commands/jest';
import defineConfig from './common/defineConfig';
import { CLI_DIR } from './common/constant';

const packageJson = fse.readJSONSync(path.join(CLI_DIR, 'package.json'), 'utf-8');
export const cliVersion: string = packageJson.version;
process.env.RCDOC_CLI_VERSION = cliVersion;

export { dev, build, docsBuild, preview, clean, test, defineConfig };

import fs from 'fs';
import { URL, fileURLToPath } from 'url';
import { dev } from './commands/dev';
import { docsBuild } from './commands/docs-build';
import { clean } from './commands/clean';
import { test } from './commands/jest';
import defineConfig from './config/defineConfig';

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf-8'));
export const cliVersion: string = packageJson.version;

process.env.REACT_VANT_CLI_VERSION = cliVersion;

export { dev, docsBuild, clean, test, defineConfig };

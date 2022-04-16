import glob from 'fast-glob';
import fse from 'fs-extra';
import path from 'path';
import slash from 'slash2';
import { get } from 'lodash-es';
import type { InlineConfig } from 'vite';
import hostedGit from 'hosted-git-info';
import { PROJECT_SRC_DIR, PROJECT_POSTCSS_CONFIG_FILE, ROOT, CWD } from './constant';
import context from './context';

const { lstatSync, existsSync, readFileSync, outputFileSync } = fse;

export const EXT_REGEXP = /\.\w+$/;
export const DEMO_REGEXP = new RegExp(`\\${path.sep}demo$`);
export const TEST_REGEXP = new RegExp(`\\${path.sep}test$`);
export const ASSET_REGEXP = /\.(png|jpe?g|gif|webp|ico|jfif|svg|woff2?|ttf)$/i;
export const STYLE_REGEXP = /\.(css|less|scss)$/;
export const SCRIPT_REGEXP = /\.(js|ts|jsx|tsx)$/;
export const TYPESCRIPT_REGEXP = /\.(ts||tsx)$/;
export const ENTRY_EXTS = ['js', 'ts', 'tsx', 'jsx'];

export function removeExt(path: string) {
  return path.replace('.tsx', '');
}

export function replaceExt(path: string, ext: string) {
  return path.replace(EXT_REGEXP, ext);
}

export function hasDefaultExport(code: string) {
  // @TODO
  // Maybe use babel/ast to get right
  return code.includes('export default') || code.includes('export { default }');
}

/**
 * Get components path Array
 * return ['/Users/3lang/Workspace/github/rcdoc/packages/cli-playground/src/components/button/index.tsx']
 */
export function getComponents(): Array<string> {
  const EXCLUDES = ['.DS_Store'];
  const dirs = glob.sync(path.normalize(path.join(PROJECT_SRC_DIR, '**/index.*')));
  return dirs
    .filter((dir) => !EXCLUDES.includes(dir))
    .filter((dir) =>
      ENTRY_EXTS.some((ext) => {
        const guessPath = path.extname(dir) === `.${ext}`;
        const guessMdPath = path.join(path.dirname(dir), 'README.md');
        if (guessPath && existsSync(guessMdPath)) {
          return hasDefaultExport(readFileSync(dir, 'utf-8'));
        }
        return false;
      }),
    );
}

export function isDir(dir: string) {
  return lstatSync(dir).isDirectory();
}

export function isDemoDir(dir: string) {
  return DEMO_REGEXP.test(dir);
}

export function isTestDir(dir: string) {
  return TEST_REGEXP.test(dir);
}

export function isAsset(path: string) {
  return ASSET_REGEXP.test(path);
}

export function isStyle(path: string) {
  return STYLE_REGEXP.test(path);
}

export function isScript(path: string) {
  return SCRIPT_REGEXP.test(path) && !path.endsWith('.d.ts');
}

export function isTsFile(path: string) {
  return TYPESCRIPT_REGEXP.test(path) && !path.endsWith('.d.ts');
}

const camelizeRE = /-(\w)/g;
const pascalizeRE = /(\w)(\w*)/g;

export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c) => c.toUpperCase());
}

export function pascalize(str: string): string {
  return camelize(str).replace(pascalizeRE, (_, c1, c2) => c1.toUpperCase() + c2);
}

export function decamelize(str: string, sepc = '-') {
  return str
    .replace(/([a-z\d])([A-Z])/g, `$1${sepc}$2`)
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, `$1${sepc}$2`)
    .toLowerCase();
}

export function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

export function getPostcssConfig() {
  if (existsSync(PROJECT_POSTCSS_CONFIG_FILE)) {
    return require(PROJECT_POSTCSS_CONFIG_FILE);
  }

  return {};
}

export type ModuleEnv = 'esmodule' | 'commonjs';
export type NodeEnv = 'production' | 'development' | 'test';
export type BuildTarget = 'site' | 'package';

export function setModuleEnv(value: ModuleEnv) {
  process.env.BABEL_MODULE = value;
}

/**
 * set Node Env / 设置Node环境
 * @param value
 */
export function setNodeEnv(value: NodeEnv) {
  process.env.NODE_ENV = value;
}

export function setBuildTarget(value: BuildTarget) {
  process.env.BUILD_TARGET = value;
}

export function isDev() {
  return process.env.NODE_ENV === 'development';
}

// smarter outputFileSync
// skip output if file content unchanged
export function smartOutputFile(filePath: string, content: string) {
  if (existsSync(filePath)) {
    const previousContent = readFileSync(filePath, 'utf-8');

    if (previousContent === content) {
      return;
    }
  }

  outputFileSync(filePath, content);
}

export function kebabCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');
}

export function mergeCustomViteConfig(config: InlineConfig) {
  const configureVite = get(context.opts, 'build.configureVite');

  if (configureVite) {
    return configureVite(config);
  }
  return config;
}

export function getConfigThemeAlias() {
  let siteTheme = get(context.opts, 'site.theme');
  if (siteTheme) {
    siteTheme = slash(path.join(ROOT, 'node_modules', siteTheme));
    return { 'rcdoc-theme-default': siteTheme };
  }
  return {};
}

export function getExistFile({
  cwd = CWD,
  files,
}: {
  cwd?: string;
  files: string[];
}): string | undefined {
  for (const file of files) {
    const absFilePath = path.join(cwd, file);
    if (existsSync(absFilePath)) {
      return absFilePath;
    }
  }
}

export function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
}

export function getRepoUrl(url: any, platform?: 'gitlab') {
  if (!url || typeof url !== 'string') return '';

  let repoUrl = hostedGit.fromUrl(url)?.browse();

  if (!repoUrl) {
    const isHttpProtocol = url.includes('http://');

    if (['gitlab', 'bitbucket'].includes(platform)) {
      if (isHttpProtocol) url = url.replace('http', 'https');

      let originalHost: string;

      repoUrl = hostedGit
        .fromUrl(
          // fake to gitlab to make hostedGit worked
          // refer: https://github.com/npm/hosted-git-info/pull/30#issuecomment-400074956
          url.replace(/([\w-]+\.)+[\w-]+/, (str) => {
            originalHost = str;

            return 'gitlab.com';
          }),
        )
        ?.browse()
        // restore the original host
        ?.replace('gitlab.com', originalHost);
    }

    // process other case, protocol://domain/group/repo{discard remaining paths}
    repoUrl =
      repoUrl || url.replace(/^.*?((?:[\w-]+\.?)+)+[:/]([\w-]+)\/([\w-]+).*$/, 'https://$1/$2/$3');

    if (isHttpProtocol) repoUrl = repoUrl.replace('https', 'http');
  }

  return repoUrl;
}

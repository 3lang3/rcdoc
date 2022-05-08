import { join, extname, relative, dirname } from 'path';
import { existsSync, remove, readJSONSync, lstatSync } from 'fs-extra';
import vfs from 'vinyl-fs';
import signale from 'signale';
import through from 'through2';
import slash from 'slash2';
import * as babel from '@babel/core';
import gulpTs from 'gulp-typescript';
import gulpLess from 'gulp-less';
import gulpIf from 'gulp-if';
import chalk from 'chalk';
import getBabelConfig, { transformImportLess2Css } from './getBabelConfig';
import { Dispose, IBundleOptions } from './types';

function getSrcPath(cwd: string, entry: string | string[]) {
  const entryPath = Array.isArray(entry) ? entry[0] : entry;
  const stat = lstatSync(entryPath);
  if (stat.isDirectory()) {
    return join(cwd, entryPath);
  }
  return join(cwd, dirname(entryPath));
}
interface IBabelOpts {
  cwd: string;
  rootPath?: string;
  type: 'esm' | 'cjs';
  target?: 'browser' | 'node';
  log?: (string) => void;
  watch?: boolean;
  dispose?: Dispose[];
  importLibToEs?: boolean;
  bundleOpts: IBundleOptions;
  needTransform?: boolean;
}

interface ITransformOpts {
  file: {
    contents: string;
    path: string;
  };
  type: 'esm' | 'cjs';
}

export default async function (opts: IBabelOpts) {
  const {
    cwd,
    rootPath,
    type,
    watch,
    needTransform,
    log,
    bundleOpts: {
      entry,
      outDir = './',
      target = 'browser',
      runtimeHelpers,
      extraBabelPresets = [],
      extraBabelPlugins = [],
      browserFiles = [],
      nodeFiles = [],
      nodeVersion,
      disableTypeCheck,
      lessInBabelMode,
      loose,
    },
  } = opts;

  const srcPath = getSrcPath(cwd, entry);
  const targetModeOps = type === 'esm' ? opts.bundleOpts.esm : opts.bundleOpts.cjs;
  let targetDir = type === 'esm' ? 'es' : 'cjs';
  if (typeof targetModeOps !== 'boolean' && targetModeOps.dist) {
    targetDir = targetModeOps.dist;
  }
  const targetPath = join(cwd, outDir, targetDir);
  log?.(chalk.gray(`Clean ${targetDir} directory`));
  await remove(targetPath);

  function transform(opts: ITransformOpts) {
    const { file, type } = opts;
    let { opts: babelOpts, isBrowser } = getBabelConfig({
      target,
      type,
      loose,
      typescript: true,
      runtimeHelpers,
      filePath: slash(relative(cwd, file.path)),
      browserFiles,
      nodeFiles,
      nodeVersion,
      lessInBabelMode,
      needTransform,
    });

    babelOpts.presets.push(...extraBabelPresets);
    babelOpts.plugins.push(...extraBabelPlugins);

    const relFile = slash(file.path).replace(`${cwd}/`, '');
    log?.(`Transform to ${type} for ${chalk[isBrowser ? 'yellow' : 'blue'](relFile)}`);

    return babel.transform(file.contents, {
      ...babelOpts,
      filename: file.path,
      // 不读取外部的babel.config.js配置文件，全采用babelOpts中的babel配置来构建
      configFile: false,
    })?.code;
  }

  function getTsconfigCompilerOptions(path: string) {
    const config = readJSONSync(path, 'utf-8');
    return config ? config.compilerOptions : undefined;
  }

  function getTSConfig() {
    const tsconfigPath = join(cwd, 'tsconfig.json');

    if (existsSync(tsconfigPath)) {
      return getTsconfigCompilerOptions(tsconfigPath) || {};
    }
    if (rootPath && existsSync(join(rootPath, 'tsconfig.json'))) {
      return getTsconfigCompilerOptions(join(rootPath, 'tsconfig.json')) || {};
    }
    return {};
  }

  function createStream(src) {
    const tsConfig = getTSConfig();
    const babelTransformRegexp = disableTypeCheck ? /\.(t|j)sx?$/ : /\.jsx?$/;

    function isTsFile(path) {
      return /\.tsx?$/.test(path) && !path.endsWith('.d.ts');
    }

    function isTransform(path) {
      return babelTransformRegexp.test(path) && !path.endsWith('.d.ts');
    }

    return vfs
      .src(src, {
        allowEmpty: true,
        base: srcPath,
      })
      .pipe(gulpIf((f) => !disableTypeCheck && isTsFile(f.path), gulpTs(tsConfig)))
      .pipe(
        // @TODO
        // Need support scss & stylus
        gulpIf((f) => lessInBabelMode && /\.less$/.test(f.path), gulpLess(lessInBabelMode || {})),
      )
      .pipe(
        gulpIf(
          (f) => isTransform(f.path),
          through.obj((file, env, cb) => {
            try {
              file.contents = Buffer.from(
                transform({
                  file,
                  type,
                }) as any,
              );
              // .jsx -> .js
              file.path = file.path.replace(extname(file.path), '.js');
              cb(null, file);
            } catch (e) {
              signale.error(`Compiled faild: ${file.path}`);
              console.log(e);
              cb(null);
            }
          }),
        ),
      )
      .pipe(vfs.dest(targetPath));
  }

  return new Promise((resolve) => {
    const patterns = [
      join(srcPath, '**/*'),
      `!${join(srcPath, '**/fixtures{,/**}')}`,
      `!${join(srcPath, '**/demos{,/**}')}`,
      `!${join(srcPath, '**/demo{,/**}')}`,
      `!${join(srcPath, '**/__test__{,/**}')}`,
      `!${join(srcPath, '**/__tests__{,/**}')}`,
      `!${join(srcPath, '**/*.mdx')}`,
      `!${join(srcPath, '**/*.md')}`,
      `!${join(srcPath, '**/*.+(test|e2e|spec).+(js|jsx|ts|tsx)')}`,
      `!${join(srcPath, '**/tsconfig{,.*}.json')}`,
      `!${join(srcPath, '.umi{,-production,-test}{,/**}')}`,
    ];
    createStream(patterns).on('end', () => {
      if (watch) {
        log?.(
          chalk.magenta(`Start watching ${slash(srcPath).replace(`${cwd}/`, '')} directory...`),
        );
      }
      resolve(true);
    });
  });
}

import { existsSync, readFileSync, remove } from 'fs-extra';
import { join, isAbsolute } from 'path';
import * as assert from 'assert';
import { merge } from 'lodash';
import signale from 'signale';
import chalk from 'chalk';
import { IOpts, IBundleOptions, IBundleTypeOutput, ICjs, IEsm, Dispose } from './types';
import babel from './babel';
import registerBabel from './registerBabel';
import { getExistFile } from './utils';
import getUserConfig, { CONFIG_FILES } from './getUserConfig';
import randomColor from './randomColor';

export function getBundleOpts(opts: IOpts): IBundleOptions[] {
  const { cwd, buildArgs = {}, rootConfig = {} } = opts;
  const entry = getExistFile({
    cwd,
    files: ['src/index.tsx', 'src/index.ts', 'src/index.jsx', 'src/index.js'],
    returnRelative: true,
  });
  const userConfig = getUserConfig({ cwd, customPath: buildArgs.config });
  const userConfigs = Array.isArray(userConfig) ? userConfig : [userConfig];
  return (userConfigs as any).map((userConfig) => {
    const bundleOpts = merge(
      {
        entry,
      },
      rootConfig,
      userConfig,
      buildArgs,
    );

    // Support config esm: 'rollup' and cjs: 'rollup'
    // if (typeof bundleOpts.esm) {
    //   bundleOpts.esm = { type: bundleOpts.esm };
    // }
    // if (typeof bundleOpts.cjs) {
    //   bundleOpts.cjs = { type: bundleOpts.cjs };
    // }

    return bundleOpts;
  });
}

function validateBundleOpts(bundleOpts: IBundleOptions, { cwd, rootPath }) {
  if (bundleOpts.runtimeHelpers) {
    const pkgPath = join(cwd, 'package.json');
    assert.ok(existsSync(pkgPath), `@babel/runtime dependency is required to use runtimeHelpers`);
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));
    assert.ok(
      (pkg.dependencies || {})['@babel/runtime'],
      `@babel/runtime dependency is required to use runtimeHelpers`,
    );
  }
  if (bundleOpts.cjs && (bundleOpts.cjs as ICjs).lazy) {
    throw new Error(
      `
cjs.lazy don't support rollup.
    `.trim(),
    );
  }
  if (!bundleOpts.esm && !bundleOpts.cjs) {
    throw new Error(
      `
None format of ${chalk.cyan(
        'cjs | esm',
      )} is configured, checkout https://github.com/3lang3/rcdoc/packages/build for usage details.
`.trim(),
    );
  }
  if (bundleOpts.entry) {
    const tsConfigPath = join(cwd, 'tsconfig.json');
    const tsConfig =
      existsSync(tsConfigPath) || (rootPath && existsSync(join(rootPath, 'tsconfig.json')));
    if (
      !tsConfig &&
      ((Array.isArray(bundleOpts.entry) && bundleOpts.entry.some(isTypescriptFile)) ||
        (!Array.isArray(bundleOpts.entry) && isTypescriptFile(bundleOpts.entry)))
    ) {
      signale.info(
        `Project using ${chalk.cyan(
          'typescript',
        )} but tsconfig.json not exists. Use default config.`,
      );
    }
  }
}

function isTypescriptFile(filePath) {
  return filePath.endsWith('.ts') || filePath.endsWith('.tsx');
}

interface IExtraBuildOpts {
  pkg?: string | { name?: string };
}

export async function build(opts: IOpts, extraOpts: IExtraBuildOpts = {}) {
  const { cwd, rootPath, watch, buildArgs = {}, clean = true, needTransform = true } = opts;
  const { pkg } = extraOpts;

  const dispose: Dispose[] = [];

  const customConfigPath =
    buildArgs.config &&
    (isAbsolute(buildArgs.config) ? buildArgs.config : join(process.cwd(), buildArgs.config));

  // register babel for config files
  registerBabel({
    cwd,
    only: customConfigPath ? CONFIG_FILES.concat(customConfigPath) : CONFIG_FILES,
  });

  const pkgName = (typeof pkg === 'string' ? pkg : pkg?.name) || 'unknown';

  function log(msg) {
    console.log(`${pkg ? `${randomColor(`${pkgName}`)}: ` : ''}${msg}`);
  }

  // Get user config
  const bundleOptsArray = getBundleOpts(opts);

  for (const bundleOpts of bundleOptsArray) {
    validateBundleOpts(bundleOpts, { cwd, rootPath });

    // Clean dist
    if (clean) {
      log(chalk.gray(`Clean dist directory`));
      remove(join(cwd, 'dist'));
    }

    // Build cjs
    if (bundleOpts.cjs) {
      log(`Build cjs with babel`);
      await babel({ cwd, rootPath, watch, dispose, type: 'cjs', log, bundleOpts, needTransform });
    }

    // Build esm
    if (bundleOpts.esm) {
      const esm = bundleOpts.esm as IEsm;
      log(`Build esm with babel`);
      const importLibToEs = esm && esm.importLibToEs;
      await babel({
        cwd,
        rootPath,
        watch,
        dispose,
        type: 'esm',
        importLibToEs,
        log,
        bundleOpts,
        needTransform,
      });
    }
  }

  return dispose;
}

export default async function (opts: IOpts) {
  const dispose = await build(opts);
  return () => dispose.forEach((e) => e());
}

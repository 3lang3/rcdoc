import path from 'path';
import slash from 'slash2';
import crypto from 'crypto';
import { transformSync } from '@babel/core';
import * as types from '@babel/types';
import _traverse from '@babel/traverse';
import {
  getModuleResolvePkg,
  getModuleResolvePath,
  getModuleResolveContent,
} from './moduleResolver';
import FileCache from './cache';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const traverse = _traverse.default;

const cachers = {
  file: new FileCache(),
  content: new FileCache(),
};

const getContentHash = (content: string) => {
  const hash = crypto.createHash('sha256');
  hash.update(content);
  return hash.digest('hex');
};

interface IAnalyzeCache {
  dependencies: {
    resolvePath: string;
    name: string;
    version: string;
    css?: string;
    peerDeps: { name: string; version: string; css?: string }[];
  }[];
  files: {
    resolvePath: string;
    requireStr: string;
    filename: string;
    content?: string;
  }[];
}

export interface IDepAnalyzeResult {
  dependencies: Record<
    string,
    {
      version: string;
      css?: string;
    }
  >;
  files: Record<string, { import: string; fileAbsPath: string; content?: string }>;
}

export const LOCAL_DEP_EXT = ['.jsx', '.tsx', '.js', '.ts'];

export const LOCAL_MODULE_EXT = [...LOCAL_DEP_EXT, '.json'];

// local dependency extensions which will be collected
export const PLAIN_TEXT_EXT = [...LOCAL_MODULE_EXT, '.less', '.css', '.scss', '.sass', '.styl'];

function analyzeDeps(
  raw: string,
  {
    isTSX,
    fileAbsPath,
    entryAbsPath,
    files = {},
    remarkOpts,
    rootPkgJson,
  }: {
    isTSX: boolean;
    fileAbsPath: string;
    entryAbsPath?: string;
    files?: IDepAnalyzeResult['files'];
    remarkOpts: any;
    rootPkgJson: any;
  },
): IDepAnalyzeResult {
  const cacheKey = fileAbsPath.endsWith('.md')
    ? `${fileAbsPath}-${getContentHash(raw)}`
    : fileAbsPath;
  const dependencies: IDepAnalyzeResult['dependencies'] = {};
  let cache: IAnalyzeCache = fileAbsPath && cachers.file.get(fileAbsPath);

  if (!cache) {
    cache = { dependencies: [], files: [] };
    let ast;
    // support to pass babel transform result directly
    try {
      ({ ast } = transformSync(raw, {
        // rename filename.md to filename.tsx to prevent babel transform failed
        filename: fileAbsPath.replace(/\.md$/, isTSX ? '.tsx' : '.jsx'),
        presets: [
          [require.resolve('@babel/preset-typescript'), { isTSX: true, allExtensions: true }],
        ],
        ast: true,
        babelrc: false,
        configFile: false,
      }));
    } catch (error) {
      console.log('transformSync: ', error);
    }
    // traverse all require call expression
    traverse(ast, {
      ImportDeclaration(callPath) {
        const callPathNode = callPath.node;
        // tranverse all require statement
        if (types.isProgram(callPath.parent)) {
          const requireStr = callPathNode.source.value;

          // local pkg match
          if (rootPkgJson?.name === requireStr) {
            cache.dependencies.push({
              resolvePath: '',
              name: requireStr,
              version: rootPkgJson.version,
              peerDeps: [],
            });
            return;
          }
          // manually specify match
          if (remarkOpts?.localPkgs?.[requireStr]) {
            cache.dependencies.push({
              resolvePath: '',
              name: requireStr,
              version: remarkOpts?.localPkgs?.[requireStr].version,
              peerDeps: [],
            });
            return;
          }

          const resolvePath = getModuleResolvePath({
            basePath: fileAbsPath,
            sourcePath: requireStr,
            extensions: LOCAL_MODULE_EXT,
            remarkOpts,
          });

          const resolvePathParsed = path.parse(resolvePath);

          if (resolvePath.includes('node_modules')) {
            // save external deps
            const pkg = getModuleResolvePkg({
              basePath: fileAbsPath,
              sourcePath: resolvePath,
              extensions: LOCAL_MODULE_EXT,
            });
            const css = getCSSForDep(pkg.name);
            const peerDeps: IAnalyzeCache['dependencies'][0]['peerDeps'] = [];

            // process peer dependencies from dependency
            Object.keys(pkg.peerDependencies || {}).forEach((dep) => {
              const peerCSS = getCSSForDep(dep);

              peerDeps.push({
                name: dep,
                version: pkg.peerDependencies[dep],
                // also collect css file for peerDependencies
                css: peerCSS,
              });
            });

            cache.dependencies.push({
              resolvePath,
              name: pkg.name,
              version: pkg.version,
              css,
              peerDeps,
            });
          } else if (
            // only analysis for valid local file type
            PLAIN_TEXT_EXT.includes(resolvePathParsed.ext) &&
            // do not collect entry file
            resolvePath !== slash(entryAbsPath || '') &&
            // to avoid collect alias module
            requireStr.startsWith('.')
          ) {
            // save local deps
            const filename = slash(path.relative(entryAbsPath || fileAbsPath, resolvePath)).replace(
              /(\.\/|\..\/)/g,
              '',
            );

            cache.files.push({
              resolvePath,
              requireStr,
              filename,
            });
          }
        }
      },
    });
  }

  // visit all dependencies
  cache.dependencies.forEach((item) => {
    dependencies[item.name] = {
      version: item.version,
      ...(item.css ? { css: item.css } : {}),
    };
  });

  // visit all peer dependencies, to make sure collect 1-level dependency first
  cache.dependencies
    .reduce((result, item) => result.concat(item.peerDeps), [])
    .filter((item) => !dependencies[item])
    .forEach((item) => {
      dependencies[item.name] = {
        version: item.version,
        ...(item.css ? { css: item.css } : {}),
      };
    });

  // visit all local files
  cache.files
    .filter((item) => {
      // to avoid circular-reference
      return !files[item.filename];
    })
    .forEach((item) => {
      const ext = path.extname(item.resolvePath);

      files[item.filename] = cachers.content.get(item.resolvePath) || {
        import: item.requireStr,
        fileAbsPath: item.resolvePath,
      };

      // cache resolve content
      cachers.content.add(item.resolvePath, files[item.filename]);

      // continue to collect deps for dep
      if (LOCAL_DEP_EXT.includes(ext)) {
        const content = getModuleResolveContent({
          basePath: fileAbsPath,
          sourcePath: item.resolvePath,
          extensions: LOCAL_DEP_EXT,
        });

        files[item.filename].content = content;

        const result = analyzeDeps(content, {
          isTSX: /\.tsx?/.test(ext),
          fileAbsPath: item.resolvePath,
          entryAbsPath: entryAbsPath || fileAbsPath,
          files,
          remarkOpts,
          rootPkgJson,
        });

        Object.assign(files, result.files);
        Object.assign(dependencies, result.dependencies);
      }
    });

  // cache analyze result for single demo code
  if (fileAbsPath) {
    cachers.file.add(fileAbsPath, cache, cacheKey);
  }

  return { files, dependencies };
}

export function getCSSForDep(dep: string) {
  const pkgWithoutGroup = dep.match(/([^\/]+)$/)[1];
  const guessFiles = [
    // @group/pkg-suffic => pkg-suffix
    `${pkgWithoutGroup}`,
    // @group/pkg-suffix => pkgsuffix @ant-design/pro-card => card
    ...(pkgWithoutGroup.includes('-')
      ? [pkgWithoutGroup.replace(/-/g, ''), pkgWithoutGroup.split('-')[1]]
      : []),
    // guess normal css files
    'main',
    'style',
    'index',
  ].reduce((files, name) => files.concat([`${name}.css`, `${name}.min.css`]), []);

  // detect guess css files
  for (let i = 0; i <= guessFiles.length; i += 1) {
    const file = guessFiles[i];

    try {
      // try to resolve CSS file
      const guessFilePath = `${dep}/dist/${file}`;

      getModuleResolvePath({
        basePath: process.cwd(),
        sourcePath: guessFilePath,
        silent: true,
      });

      return guessFilePath;
    } catch (err) {
      /* nothing */
    }
  }
}

export default analyzeDeps;

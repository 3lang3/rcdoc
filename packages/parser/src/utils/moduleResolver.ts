import fs from 'fs';
import path from 'path';
import slash from 'slash2';
import resolve from 'enhanced-resolve';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const DEFAULT_EXT = ['.tsx', '.jsx', '.js', '.ts'];

interface IModuleResolverOpts {
  basePath: string;
  sourcePath: string;
  extensions?: string[];
  silent?: boolean;
  remarkOpts?: any;
}

export function getPkgJsonForPath(absPath: string) {
  const pkgPath = path.join(absPath, 'package.json');
  if (fs.existsSync(pkgPath)) {
    return require(pkgPath);
  }
  return {};
}

function getPkgAliasForPath(absPath: string) {
  const result: [string, string] = ['', absPath];
  const pkgPath = path.join(absPath, 'package.json');
  // use package.name if exists
  if (fs.existsSync(pkgPath)) {
    result[0] = require(pkgPath).name;
  }

  return result;
}

const getHostPkgAlias = (aliasPath?) => {
  const pkgs: [string, string][] = [];
  pkgs.push(getPkgAliasForPath(aliasPath || process.cwd()));
  return pkgs;
};

/**
 * get package related paths from source path
 * @param identifier  module path, such as mdoc/lib/a.js or /path/to/node_modules/mdoc/lib/a.js
 */
const getPkgPathsFromPath = (identifier: string) => {
  const matches = identifier.match(/^(.*node_modules)\/((?:@[^/]+\/)?[^/]+)/) || [];
  return {
    absSourcePath: identifier,
    absPkgModulePath: matches[0],
    absNodeModulesPath: matches[1],
    pkgName: matches[2],
  };
};

/**
 * get package root path if it is a local package
 * @param pkg   package name
 */
const getHostPkgPath = (() => {
  let cache: ReturnType<typeof getHostPkgAlias>;

  return (pkg: string, aliasPath?: string) => {
    if (!cache) {
      cache = getHostPkgAlias(aliasPath);
    }

    return cache.find(([name]) => name === pkg)?.[1];
  };
})();

/**
 * resolve module path base on umi context (alias)
 */
export const getModuleResolvePath = ({
  basePath,
  sourcePath,
  extensions = DEFAULT_EXT,
  silent,
  remarkOpts,
}: IModuleResolverOpts) => {
  const depResolver = resolve.create.sync({
    extensions,
    alias: remarkOpts?.alias,
    symlinks: false,
    mainFiles: ['index', 'package.json'],
    conditionNames: ['node', 'import', 'require'],
  });
  try {
    const targetPath = fs.statSync(basePath).isDirectory() ? basePath : path.parse(basePath).dir;
    let resolvePath = depResolver(targetPath, sourcePath) as string;
    if (remarkOpts?.alias?.[sourcePath]) {
      resolvePath = path.join(
        resolvePath.substring(0, resolvePath.lastIndexOf(sourcePath)),
        sourcePath,
      );
    }

    return slash(resolvePath);
  } catch (err) {
    if (!silent) {
      console.error(`[rcdoc]: cannot resolve module ${sourcePath} from ${basePath}`);
    }

    throw err;
  }
};

/**
 * resolve module version
 */
export const getModuleResolvePkg = ({
  basePath,
  sourcePath,
  extensions = DEFAULT_EXT,
}: IModuleResolverOpts) => {
  let version: string | null;
  let name: string | null;
  let peerDependencies: any | null;
  const resolvePath = getModuleResolvePath({ basePath, sourcePath, extensions });
  const { pkgName, absPkgModulePath } = getPkgPathsFromPath(resolvePath);

  // use project path as module path for local packages
  const modulePath = getHostPkgPath(pkgName) || absPkgModulePath;
  const pkgPath = path.join(modulePath, 'package.json');

  if (modulePath && fs.existsSync(pkgPath)) {
    const pkg = require(pkgPath);

    version = pkg.version;
    name = pkg.name;
    peerDependencies = pkg.peerDependencies;
  } else {
    console.error(`[rcdoc]: cannot find valid package.json for module ${modulePath}`);
  }

  return { name, version, peerDependencies };
};

/**
 * resolve module content
 */
export const getModuleResolveContent = ({
  basePath,
  sourcePath,
  extensions = DEFAULT_EXT,
}: IModuleResolverOpts) => {
  const resolvePath = getModuleResolvePath({ basePath, sourcePath, extensions });

  return resolvePath ? fs.readFileSync(resolvePath, 'utf8').toString() : '';
};

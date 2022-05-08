export type BundleType = 'babel';
interface IBundleTypeOutput {
  type: BundleType;
  file?: string;
}

export interface ICjs extends IBundleTypeOutput {
  minify?: boolean;
  lazy?: boolean;
  dist?: string;
}

interface IEsm extends IBundleTypeOutput {
  mjs?: boolean;
  minify?: boolean;
  importLibToEs?: boolean;
  dist?: string;
}

interface IStringObject {
  [prop: string]: string;
}

interface IUmd {
  globals?: IStringObject;
  name?: string;
  minFile?: boolean;
  file?: string;
  sourcemap?: boolean;
}

export interface IBundleOptions {
  entry?: string | string[];
  file?: string;
  outDir?: string;
  esm?: IEsm | false;
  cjs?: ICjs | false;
  extraBabelPlugins?: any[];
  extraBabelPresets?: any[];
  extraPostCSSPlugins?: any[];
  extraRollupPlugins?: any[];
  extraExternals?: string[];
  externalsExclude?: string[];
  cssModules?: boolean | Object;
  extractCSS?: boolean;
  injectCSS?: boolean | ((varname: string, filename: string) => string);
  inject?: Object;
  autoprefixer?: Object;
  include?: string | RegExp;
  runtimeHelpers?: boolean;
  target?: 'node' | 'browser';
  overridesByEntry?: {
    [entry: string]: any;
  };
  replace?: {
    [value: string]: any;
  };
  browserFiles?: {
    [value: string]: any;
  };
  nodeFiles?: {
    [value: string]: any;
  };
  nodeVersion?: number;
  disableTypeCheck?: boolean;
  preCommit?: {
    eslint?: boolean;
    prettier?: boolean;
  };
  lessInBabelMode?:
    | boolean
    | {
        paths?: any[];
        plugins?: any[];
      };
  typescriptOpts?: {
    [value: string]: any;
  };
  nodeResolveOpts?: {
    [value: string]: any;
  };
  lessInRollupMode?: {
    [opt: string]: any;
  };
  sassInRollupMode?: {
    [opt: string]: any;
  };
  pkgs?: string[];
  /** 处理 lerna 包 */
  pkgFilter?: {
    /** 指定包含的包 */
    include?: string[];
    /** 指定排除的包 */
    exclude?: string[];
    /**
     * 跳过私有的包 package.json private
     * @default false
     * */
    skipPrivate?: boolean;
  };
  config?: string;
  loose?: boolean;
}

export interface IOpts {
  cwd: string;
  /**
   * 构建时清空outputDir
   * @default true
   * */
  clean?: boolean;
  watch?: boolean;
  buildArgs?: IBundleOptions;
  rootConfig?: IBundleOptions;
  rootPath?: string;
  needTransform?: boolean;
}

export type Dispose = () => void;

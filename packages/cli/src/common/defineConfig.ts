import type { UserConfig as ViteConfig } from 'vite';

interface IBundleTypeOutput {
  /** 入口文件 */
  file?: string;
  /** 构建输出目录 */
  dist?: string;
  /** 是否压缩 */
  minify?: boolean;
}
interface BuildEsmType extends IBundleTypeOutput {
  /** 是否以.mjs后缀形式输出 */
  mjs?: boolean;
  importLibToEs?: boolean;
}

/** 配置 Algolia 的 DocSearch 服务 */
type AlgoliaProps = {
  appId: string;
  apiKey: string;
  indexName: string;
} & Record<string, any>;

/** API组件解析配置 */
type ApiParserProps = {
  // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
  propFilter?: {
    // 是否忽略从 node_modules 继承的属性，默认值为 false
    skipNodeModules?: false;
    // 需要忽略的属性名列表，默认为空数组
    skipPropsWithName?: string[];
    // 是否忽略没有文档说明的属性，默认值为 false
    skipPropsWithoutDoc?: false;
  };
};

type NavItem = {
  title?: string;
  path?: string;
  /** 是否首页 */
  index?: boolean;
  simulator?: boolean;
  children?: NavItem[];
};

type MenuItem = {
  title?: string;
  children?: string[];
};

export type DefineConfig = {
  /**
   * 配置文档的标题
   * @default package.name
   */
  title?: string;
  /** 配置文档的介绍，会显示在侧边栏菜单标题的下方 */
  description?: string;
  /**
   * 配置文档的 LOGO
   * 如果是使用本地图片，比如：/public/images/xxx.png，那么配置 /images/xx.png 引入即可。
   */
  logo?: string;
  /** 菜单配置 */
  menus?: Record<string, MenuItem[]>;
  /** 顶部导航配置 */
  navs?: NavItem[] | Record<string, NavItem[]>;
  /**
   * 国际化配置
   * @default [['zh-CN', '中文'], ['en-US', 'English']]
   */
  locales?: false | Array<[string, string]>;
  /** 站点额外信息配置 */
  site?: {
    /**
     * 自动注入component css
     * @default true
     */
    injectComponentCss?: boolean;
    /**
     * 设置history类型
     * @default 'broswer'
     */
    history?: 'hash' | 'broswer';
    /**配置 favicon 地址（href 属性） */
    favicon?: string;
    /** 配置 <head> 里的额外脚本，数组项为字符串或对象 */
    headScripts?: Array<string | any>;
    /** 版本信息 */
    versions?: false | { title: string; path?: string }[];
    /**  配置额外的 meta 标签。数组中可以配置key:value形式的对象 */
    metas?: { name: string; content: string }[];
    /** 是否开启vconsole */
    vconsole?: boolean;
    /** github地址，在顶部菜单栏右侧展示 */
    github?: string;
    /**
     * 自定义主题包
     * @default 'rcdoc-theme-default'
     */
    theme?: string;
    /** 用于配置当前使用的主题包，具体配置项取决于主题包提供哪些配置 */
    themeConfig?: {
      /** 开启暗色主题 */
      dark?: boolean;
      /** 是否开启模拟器视图，需要主题支持 */
      simulator?: {
        /** 显示模拟器的路由前缀 */
        include: string[];
        /** 是否开启紧凑模式
         * @default false
         */
        compact?: boolean;
      };
    } & Record<string, any>;
    /** 控制锚点目录的显示或位置，值为 false 时不展示，值为 content 时展示在内容区域的右侧，值为 menu 时会将当前路由的锚点目录展示在左侧菜单中 */
    slug?: false | 'content' | 'menu';
    /** 配置 Algolia 的 DocSearch 服务 */
    algolia?: AlgoliaProps;
    /**  配置 <API /> 解析的行为 */
    apiParser?: ApiParserProps;

    /** 自动生成sitemap.xml, hostname 配置项用来指定 URL 的域名前缀，excludes 配置项用来忽略某些不需要包含在 sitemap 中的路由。 */
    sitemap?: {
      hostname: string;
      exclude?: string[];
    };
  } & Record<string, any>;
  /** 自定义vite配置 */
  vite?: Pick<
    ViteConfig,
    | 'base'
    | 'publicDir'
    | 'css'
    | 'plugins'
    | 'server'
    | 'define'
    | 'esbuild'
    | 'resolve'
    | 'optimizeDeps'
  >;
  /** 构建配置 */
  build?: {
    /**
     * 自定义esm输出
     * @default 'es''
     */
    esm?: boolean | BuildEsmType;
    /**
     * 自定义cjs输出
     *  @default 'cjs'
     */
    cjs?: boolean | IBundleTypeOutput;
    /**
     * vite bundle 打包输出目录
     * @default '.''
     */
    bundleDir?: string;
    /**
     * 组件样式路径，默认为 index.less
     * @example
     * 如果你的组件结构如下
     * - components
     *  - button
     *    - index.ts
     *    - style
     *     - index.less
     * 则设置为 './style/index.less' 即可
     * @default 'index.less'
     */
    style?: string;
    /** 构建入口
     * @default 'src/index'
     */
    /** 构建入口
     * 会自动触探目录下的index文件
     * @default 'src'
     */
    entry?: string;
  } & Record<string, any>;
  /** 配置解析行为，包含如下配置 */
  resolve?: {
    /**
     * 配置嗅探文档目录，会尝试在配置的目录中递归寻找 markdown 文件
     * 默认值为 docs 目录、src 目录（普通项目）
     * 如果环境为 lerna 项目，则 src 目录变为 packages/pkg/src 目录，通常不需要配置，除非自动嗅探出现了『误伤』。
     */
    includes?: string[];
    /**
     * 需要排除的目录，会对嗅探到的目录或文件进行过滤，规则同 gitignore 配置。
     */
    excludes?: string[];
    /**
     * 默认会转换为 ReactComponent 组件渲染的代码块，如果不希望做任何转换，例如类似官网的纯站点，那么将该项设置为空数组即可。
     * @default ['jsx', 'tsx']
     */
    previewLangs?: string[];
    /**
     * 代码块被动渲染模式，当为 true 时，仅将属于 resolve.previewLangs 且具有 preview 修饰符的代码块渲染为 ReactComponent 代码块。
     * 一般用于仅希望渲染 resolve.previewLangs 中的少部分代码块，而不是全部。
     */
    passivePreview?: boolean;
    /**
     * codesandbox demo配置
     */
    codesandbox?: {
      /** div#root的margin属性 */
      margin?: string;
      extra?: string;
    };
    /**
     * stackBlitz demo配置
     */
    stackblitz?: {
      /** div#root的margin属性 */
      margin?: string;
      extra?: string;
    };
  };
  /**
   * 设置 `repository` 后，会在页面底部生成相应的**编辑功能**按钮
   * 默认采用 package.json 中的 `repository` 字段
   * */
  repository?: {
    url?: string;
    branch: string;
    platform?: string;
    /** monorepo下的子包路径 */
    package?: string;
  };
} & Record<string, any>;

export default function defineConfig(config: DefineConfig) {
  return config;
}

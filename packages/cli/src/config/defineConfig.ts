export type UserConfigExport = {
  /** 配置 Algolia 的 DocSearch 服务 */
  algolia?: Record<string, any>;
  apiParser?: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter?: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules?: false,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName?: string[],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc?: false,
    },
  },
  /** 
   * 配置文档的名称
   * @default package.name
   */
  title: string;
  /** 配置文档的介绍，会显示在侧边栏菜单标题的下方，仅 doc 模式下可用 */
  description?: string;
  /** 
   * 配置文档的 LOGO
   * 如果是使用本地图片，比如：/public/images/xxx.png，那么配置 /images/xx.png 引入即可。
   */
  logo?: string;
  /** 自动生成的菜单 */
  menus?: Record<string, any>;
  /** 用于配置 mdoc 的解析行为，包含如下配置 */
  resolve?: {
    includes?: string[];
    excludes?: string[];
    previewLangs?: string[];
    passivePreview?: boolean;
  },
  /** 
   * 自定义主题包
   * @default 'mdoc-theme-default'
   */
  theme?: string;
} & Record<string, any>

export default function defineConfig(config: UserConfigExport) {
  return config;
}

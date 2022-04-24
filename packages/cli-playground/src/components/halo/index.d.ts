export interface NativeProps<S extends string = never> {
  /**
   * @description Custom style
   */
  style?: React.CSSProperties;
  /**
   * @description tabIndex property
   * @default 1
   */
  tabIndex?: number;
}

export type ButtonProps = {
  /**
   * 可以这样写属性描述
   * @description       You can also explicitly add a description name123hha
   * @description.zh-CN 还支持不同的 locale 后缀来实现多语言描述
   * @default           支持定义默认值
   */
  className: string;
} & NativeProps;
export type OtherProps = {
  /**
   * Other 可以这样写属性描述
   * @description       You can also explicitly add a description name Other
   * @description.zh-CN 也可以显式加上描述名
   * @default           支持定义默认值
   */
  className: string;
};

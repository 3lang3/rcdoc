import { visit } from 'unist-util-visit';
import toJSX from '@mapbox/hast-util-to-jsx';
import { Options } from 'remark-parse';
import type { Root } from 'hast';
import type { CompilerFunction, Plugin } from 'unified';
import type { MDocElmNode } from '../types';

/**
 * transform props base on JSX rule
 * @param props   original props
 */
const formatJSXProps = (props: Record<string, any>): Record<string, any> => {
  const OMIT_NULL_PROPS = ['alt', 'align'];

  return Object.keys(props || {}).reduce((result, key) => {
    // ignore useless empty props
    if (props[key] !== null || !OMIT_NULL_PROPS.includes(key)) {
      result[key] = props[key];
    }

    // use wrapper object for workaround implement raw props render
    // https://github.com/mapbox/jsxtreme-markdown/blob/main/packages/hast-util-to-jsx/index.js#L167
    if (
      !(props[key] instanceof String) &&
      props[key] !== null &&
      (typeof props[key] === 'object' || Array.isArray(props[key]))
    ) {
      result[key] = new String(JSON.stringify(props[key]));
    }

    // join className to string
    if (key === 'className' && Array.isArray(props[key])) {
      result[key] = props[key].join(' ');
    }

    return result;
  }, {});
};

/**
 * rehype compiler for compile hast to jsx
 */
export default function jsxify(): Plugin<[] | [Options], Root, string> {
  const compiler: CompilerFunction<MDocElmNode> = (tree) => {
    const remarkOpts = this.data('remarkOpts');
    visit<MDocElmNode, string>(tree, 'element', (node) => {
      node.properties = formatJSXProps(node.properties);
    });
    let JSX = toJSX(tree) || '';

    // append previewProps for previewer
    JSX = JSX.replace(
      /data-previewer-props-replaced="([^"]+)"/g,
      `{...${remarkOpts.prefix}$1PreviewerProps}`,
    );

    if (remarkOpts?.replaceHtml) {
      JSX = remarkOpts.replaceHtml(JSX);
    }
    return JSX;
  };

  Object.assign(this, { Compiler: compiler });
  return null;
}

import analyzeDeps from './analyzeDeps';
import type { IDepAnalyzeResult } from './analyzeDeps';
import { MDocElmNode } from '../types';

export interface IPreviewerComponentProps {
  title?: string;
  description?: string;
  sources:
    | {
        /**
         * self source code for demo
         * @note  jsx exsits definitely, tsx exists when the source code language is tsx
         */
        _: { jsx: string; tsx?: string };
      }
    | Record<
        string,
        {
          import: string;
          content: string;
          path?: string;
          tsx?: string;
        }
      >;
  /**
   * third-party dependencies of demo
   */
  dependencies: IDepAnalyzeResult['dependencies'];
  /**
   * global identifier for demo
   */
  identifier: string;
  /**
   * the component which demo belongs to
   */
  componentName?: string;
  /**
   * motions of current demo, for snapshot or preview
   */
  motions?: string[];
  /**
   * mark demo as debug demo, will be discarded in production mode
   */
  debug?: true;
  [key: string]: any;
}

type KnownKeys<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

// refer: https://github.com/microsoft/TypeScript/issues/31153#issuecomment-886674446
type OmitFromKnownKeys<T, K extends keyof T> = KnownKeys<T> extends infer U
  ? keyof U extends keyof T
    ? Pick<T, Exclude<keyof U, K>> & Pick<T, Exclude<keyof T, keyof KnownKeys<T>>>
    : never
  : never;

interface ITransformerPreviewerProps
  extends OmitFromKnownKeys<IPreviewerComponentProps, 'sources'> {
  // override sources type, transformer only need to return { path: string }
  sources: Record<
    string,
    {
      /**
       * absolute path for current file
       */
      path: string;
      /**
       * demo source code, only for code block demo in md
       */
      content?: string;
      /**
       * import statement for current file
       */
      import?: string;
      /**
       * legacy jsx entry file
       * @deprecated
       */
      jsx?: string;
      /**
       * legacy tsx entry file
       * @deprecated
       */
      tsx?: string;
    }
  >;
}

export type IPreviewerTransformerResult = {
  /**
   * render component props;
   */
  rendererProps?: Record<string, any>;
  /**
   * previewer component props
   */
  previewerProps: Partial<ITransformerPreviewerProps>;
};

export type IPreviewerTransformer = {
  /**
   * transformer type
   * @note  'builtin' means builtin transformer
   */
  type: string;
  /**
   * previewer component file path of current transformer
   * @note  builtin transformer has not this field
   */
  component?: string;
  /**
   * transformer function
   */
  fn: (opts: {
    /**
     * attributes from code HTML tag
     */
    attrs?: { src: string; [key: string]: any };
    /**
     * current markdown file path
     */
    mdAbsPath: string;
    /**
     * mdast node
     */
    node: MDocElmNode;
    remarkOpts: any;
    rootPkgJson: any;
  }) => IPreviewerTransformerResult;
};

/**
 * builtin previewer transformer
 */
export const getPreviewerAnalyzeData: IPreviewerTransformer['fn'] = ({
  mdAbsPath,
  node,
  remarkOpts,
  rootPkgJson,
}) => {
  const fileAbsPath = node.properties.filePath || mdAbsPath;
  let files: IDepAnalyzeResult['files'] = {};
  let dependencies: IDepAnalyzeResult['dependencies'] = {};

  // collect third-party dependencies and locale file dependencies for demo
  // FIXME: handle frontmatter in the head of external demo code
  if (!node.properties.meta?.inline) {
    try {
      ({ files, dependencies } = analyzeDeps(node.properties.source, {
        isTSX: /^tsx?$/.test(node.properties.lang),
        fileAbsPath,
        remarkOpts,
        rootPkgJson,
      }));
    } catch {
      /* nothing */
    }
  }

  return {
    // previewer props
    previewerProps: {
      sources: {
        _: {
          [node.properties.lang]: node.properties.source,
        } as any,
        ...Object.keys(files).reduce(
          (result, file) => ({
            ...result,
            [file]: {
              import: files[file].import,
              path: files[file].fileAbsPath,
              content: files[file].content,
            },
          }),
          {},
        ),
      },
      dependencies,
    },
  };
};

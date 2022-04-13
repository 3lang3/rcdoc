import type { Transformer } from 'unified';
import type { Node } from 'hast';

export type MDocUnifiedTransformer<T = Parameters<Transformer>[0]> = (
  node: T,
  vFile: Parameters<Transformer>[1] & { data: MDocVFileData },
  next?: Parameters<Transformer>[2],
) => ReturnType<Transformer>;

export interface MDocVFileData {
  /**
   * markdown file path base cwd
   */
  filePath?: string;
  /**
   * markdown file updated time in git history, fallback to file updated time
   */
  updatedTime?: number;
  /**
   * the related component name of markdown file
   */
  componentName?: string;
  /**
   * page title
   */
  title?: string;
  /**
   * component keywords
   */
  keywords?: string[];
  /**
   * mark component deprecated
   */
  deprecated?: true;
  /**
   * component uuid (for HiTu)
   */
  uuid?: string;
  /**
   * slug list in markdown file
   */
  slugs?: {
    depth: number;
    text: string;
    id: string;
  }[];
  demos?: any[];
}

export interface MDocElmNode extends Node {
  properties: {
    id?: string;
    href?: string;
    [key: string]: any;
  };
  tagName: string;
  children?: MDocElmNode[];
  value?: string;
  previewer?: boolean;
}

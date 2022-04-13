import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehype from './rehype';
import raw from './raw';
import slug from './slug';
import language from './language';
import meta from './meta';
import pre from './pre';
import code from './code.js';
import previewer from './previewer';
import jsxify from './jsxify';
import docgen from './docgen';
import { getPkgJsonForPath } from '../utils/moduleResolver';
import type { ApiParserProps } from '../docgen/parser';

const CWD = process.cwd();

export type MDocCoreOptions = {
  prefix?: string;
  alias?: Record<string, string>;
  apiParser?: boolean | ApiParserProps;
  replaceHtml?: (htmlString: string) => string;
  previewLangs?: string[];
  passivePreview?: boolean;
  localPkgs?: Record<string, { version: string; css?: string }>;
};

type RemarkReturn = {
  demos: any[];
  value: string;
  frontmatter: Record<string, string>;
  slugs: { depth: number; text: string; id: string }[];
  definitions?: Record<string, Record<string, string>[]>;
  title?: string;
  updatedTime?: string;
};

const defaultOpts: MDocCoreOptions = {
  prefix: 'MdocDemo',
  previewLangs: ['tsx', 'jsx'],
  apiParser: true,
};

export default async function remark(
  source,
  id,
  options: MDocCoreOptions = {},
): Promise<RemarkReturn> {
  const remarkOpts = Object.assign({}, defaultOpts, options);
  const rootPkgJson = getPkgJsonForPath(CWD);
  const processor = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(meta)
    .use(language)
    .use(rehype)
    .use(pre)
    .use(raw)
    .use(code)
    .use(docgen)
    .use(slug)
    .use(previewer)
    .data('fileAbsPath', id)
    .data('remarkOpts', remarkOpts)
    .data('rootPkgJson', rootPkgJson);

  processor.use(jsxify);
  const { data, value } = processor.processSync(source);
  const {
    demos = [],
    slugs,
    frontmatter,
    title,
    updatedTime,
  } = data as RemarkReturn & Record<string, string>;

  return { demos, slugs, frontmatter, title, updatedTime, value: value.toString() };
}

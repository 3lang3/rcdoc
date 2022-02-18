import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import rehype from './rehype';
import raw from './raw'
import slug from './slug';
import language from './language';
import meta from './meta';
import pre from './pre';
import code from './code.js';
import previewer from './previewer';
import jsxify from './jsxify';
import { getPkgJsonForPath } from '../utils/moduleResolver';

const CWD = process.cwd();

type MDocCoreOptions = {
  prefix?: string;
  alias?: Record<string, string>;
  replaceHtml?: (htmlString: string) => string;
  previewLangs?: string[];
  passivePreview?: boolean;
  localPkgs?: Record<string, { version: string; css?: string; }>;
}

type RemarkReturn = { demos: any[]; value: string; meta: Record<string, string>; slugs: { depth: number; text: string; id: string; }[] };

const defaultOpts: MDocCoreOptions = {
  prefix: 'MdocDemo',
  previewLangs: ['tsx', 'jsx']
}

export default async function remark(source, id, options: MDocCoreOptions = {}): Promise<RemarkReturn> {
  const remarkOpts = Object.assign({}, defaultOpts, options)
  const rootPkgJson = getPkgJsonForPath(CWD)
  const processor = await unified()
    .use(remarkParse)
    .use(slug)
    .use(remarkGfm)
    .use(remarkFrontmatter)
    .use(meta)
    .use(language)
    .use(rehype)
    .use(pre)
    .use(raw)
    .use(code)
    .use(previewer)
    .data('fileAbsPath', id)
    .data('remarkOpts', remarkOpts)
    .data('rootPkgJson', rootPkgJson);

  processor.use(jsxify);

  const { data, value } = processor.processSync(source);
  const { demos = [], slugs, ...mdMeta } = data as (RemarkReturn & Record<string, string>)

  // console.log(value.toString());
  return { demos, slugs, meta: mdMeta, value: value.toString() };
}

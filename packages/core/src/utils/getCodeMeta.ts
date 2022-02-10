import yaml from './yaml';

type TransformResult = {
  content: string;
  meta: Record<string, string>;
}

export const getCodeMeta = (raw: string): TransformResult => {
  const [, comments = '', content = ''] = raw
    // clear head break lines
    .replace(/^\n\s*/, '')
    // split head comments & remaining code
    .match(/^(\/\*\*[^]*?\n\s*\*\/)?(?:\s|\n)*([^]+)?$/);

  const frontmatter = comments
    // clear / from head & foot for comment
    .replace(/^\/|\/$/g, '')
    // remove * from comments
    .replace(/(^|\n)\s*\*+/g, '$1');
  const meta = yaml(frontmatter);

  return { content: Object.keys(meta).length ? content : raw, meta };
}
import fse from 'fs-extra';
import fm from 'front-matter';

/**
 * Get md headings and frontmatter data
 * @param filePath markdown file path
 */
export function getHeadingsAndFrontmatter(filePath: string) {
  const mdString = fse.readFileSync(filePath, 'utf-8');
  const headings: string[] = [];
  // Get md headings
  const lines = mdString.split('\n');
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line.startsWith('#')) headings.push(line.replace(/^#+\s?/, ''))
  }
  // Get md frontmatter attributes
  const { attributes: frontmatter } = fm<Record<string, any>>(mdString);

  return { frontmatter, headings }
}
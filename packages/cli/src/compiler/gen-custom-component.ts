import path from 'path';
import { PROJECT_SRC_DIR, SITE_CUSTOM_COMPONENT_FILE } from '../common/constant';
import { getExistFile, smartOutputFile } from '../common';

const GUESS_FOOTER_PATH = ['Footer.js', 'Footer.ts', 'Footer.jsx', 'Footer.tsx'];

/**
 * Generate site footer component
 */
export function genSiteFooter(code: string): string {
  const footerPath = getExistFile({
    files: GUESS_FOOTER_PATH.map((el) => path.join('_rcdoc_', el)),
  });
  if (footerPath) {
    code += `export { default as Footer} from '${path.relative(PROJECT_SRC_DIR, footerPath)}'\n`;
  } else {
    code += `export const Footer = () => null\n`;
  }
  return code;
}

export default () => {
  let code = '';
  code += genSiteFooter(code);
  smartOutputFile(SITE_CUSTOM_COMPONENT_FILE, code);
};

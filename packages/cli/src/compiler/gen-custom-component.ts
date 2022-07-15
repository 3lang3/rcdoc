import path from 'path';
import slash from 'slash2';
import { PROJECT_SRC_DIR, SITE_CUSTOM_COMPONENT_FILE } from '../common/constant';
import { ENTRY_EXTS, getExistFile, smartOutputFile } from '../common';

function generateGuessPath(componentName) {
  return ENTRY_EXTS.map((ext) => `${componentName}.${ext}`);
}

type CustomComponentItem = {
  path: string;
  fileName: string;
  exportName?: string;
  exportDefault?: string;
};

const CUSTOM_COMPONENTS_ARR: CustomComponentItem[] = [
  {
    path: '.',
    fileName: 'Footer', // 全局底部内容
  },
  {
    path: '.',
    fileName: 'HeaderExtra', // 全局 Header 额外区域内容自定义
  },
  {
    fileName: 'Header',
    exportName: 'MobileHeader', // 模拟器头部内容
    exportDefault: 'false',
    path: './mobile',
  },
];

/**
 * Generate mobile view header component
 */
export function genCustomComponent(item: CustomComponentItem): string {
  const componentPath = getExistFile({
    files: generateGuessPath(item.fileName).map((el) => path.join('_rcdoc_', item.path, el)),
  });
  const exportName = item.exportName || item.fileName;
  const exportDefault = item.exportDefault || '() => null';
  if (componentPath) {
    return `export { default as ${exportName} } from '${slash(
      path.relative(PROJECT_SRC_DIR, componentPath),
    )}'\n`;
  }
  return `export const ${exportName} = ${exportDefault}\n`;
}

export default () => {
  const code = CUSTOM_COMPONENTS_ARR.reduce((a, v) => {
    a += genCustomComponent(v);
    return a;
  }, '');
  smartOutputFile(SITE_CUSTOM_COMPONENT_FILE, code);
};

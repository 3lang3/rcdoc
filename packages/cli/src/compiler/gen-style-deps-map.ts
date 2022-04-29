import { join } from 'path';
import fse from 'fs-extra';
import slash from 'slash2';
import { getCssLang } from '../common/css';
import { getDeps, clearDepsCache } from './get-deps';
import { getComponents, smartOutputFile } from '../common';
import { STYLE_DEPS_JSON_FILE } from '../common/constant';
import context from '../common/context';

const { existsSync } = fse;

export function checkStyleExists(component: string) {
  const CSS_LANG = getCssLang();
  const stylePath = join(component, '..', context.opts?.build?.style);
  return existsSync(stylePath);
}

// analyze component dependencies
function analyzeComponentDeps(components: string[], componentEntry: string) {
  const checkList: string[] = [];
  const record = new Set();

  function search(filePath: string) {
    record.add(filePath);
    getDeps(filePath).forEach((key) => {
      if (record.has(key)) {
        return;
      }
      search(key);
      components
        // .filter((item) => matchPath(key, item))
        .forEach((item) => {
          if (!checkList.includes(item)) {
            checkList.push(item);
          }
        });
    });
  }

  search(componentEntry);
  return checkList.filter(checkStyleExists);
}

type DepsMap = Record<string, string[]>;

function getSequence(components: string[], depsMap: DepsMap) {
  const sequence: string[] = [];
  const record = new Set();

  function add(item: string) {
    const deps = depsMap[item];

    if (sequence.includes(item) || !deps) {
      return;
    }

    if (record.has(item)) {
      sequence.push(item);
      return;
    }

    record.add(item);

    if (!deps.length) {
      sequence.push(item);
      return;
    }

    deps.forEach(add);

    if (sequence.includes(item)) {
      return;
    }

    const maxIndex = Math.max(...deps.map((dep) => sequence.indexOf(dep)));

    sequence.splice(maxIndex + 1, 0, item);
  }

  components.forEach(add);

  return sequence;
}

export async function genStyleDepsMap() {
  const components = getComponents();

  return new Promise((resolve) => {
    clearDepsCache();

    const map = {} as DepsMap;

    components.forEach((component) => {
      map[slash(component)] = analyzeComponentDeps(components, component);
    });
    const sequence = getSequence(components, map);

    Object.keys(map).forEach((key) => {
      map[key] = map[key].sort((a, b) => sequence.indexOf(a) - sequence.indexOf(b));
    });

    smartOutputFile(STYLE_DEPS_JSON_FILE, JSON.stringify({ map, sequence }, null, 2));

    resolve(true);
  });
}

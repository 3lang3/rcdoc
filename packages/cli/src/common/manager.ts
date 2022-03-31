import path from 'path'
import { execa } from 'execa';
import { execSync } from 'child_process';
import { consola } from './logger';
import { readJsonSync } from 'fs-extra';

let hasYarnCache: boolean;

export function hasYarn() {
  if (hasYarnCache === undefined) {
    try {
      execSync('yarn --version', { stdio: 'ignore' });
      hasYarnCache = true;
    } catch (e) {
      hasYarnCache = false;
    }
  }

  return hasYarnCache;
}

function getPackageManager() {
  const pkg = readJsonSync(path.join(process.cwd(), 'package.json'));
  if (pkg?.packageManager) {
    return pkg?.packageManager
  }

  return hasYarn() ? 'yarn' : 'npm';
}

export async function installDependencies() {
  consola.info('Install Dependencies\n');

  try {
    const manager = getPackageManager();

    await execa(manager, ['install', '--prod=false'], {
      stdio: 'inherit',
    });

    console.log('');
  } catch (err) {
    console.log(err);
    throw err;
  }
}

import { execa } from 'execa';
import { execSync } from 'child_process';
import { consola } from './logger';
import { getMdocConfig } from './constant';

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

async function getPackageManager() {
  const { build } = await getMdocConfig();

  if (build?.packageManager) {
    return build?.packageManager;
  }

  return hasYarn() ? 'yarn' : 'npm';
}

export async function installDependencies() {
  consola.info('Install Dependencies\n');

  try {
    const manager = await getPackageManager();

    await execa(manager, ['install', '--prod=false'], {
      stdio: 'inherit',
    });

    console.log('');
  } catch (err) {
    console.log(err);
    throw err;
  }
}

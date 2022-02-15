import { execa } from 'execa';
import { execSync } from 'child_process';
import { consola } from './logger';

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

async function getPackageManager(userConfig) {
  if (userConfig?.build?.packageManager) {
    return userConfig?.build?.packageManager;
  }

  return hasYarn() ? 'yarn' : 'npm';
}

export async function installDependencies(userConfig) {
  consola.info('Install Dependencies\n');

  try {
    const manager = await getPackageManager(userConfig);

    await execa(manager, ['install', '--prod=false'], {
      stdio: 'inherit',
    });

    console.log('');
  } catch (err) {
    console.log(err);
    throw err;
  }
}

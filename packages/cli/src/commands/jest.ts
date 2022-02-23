import jest from 'jest';
import type { Config } from '@jest/types';
import { setNodeEnv } from '../common';
import { ROOT, JEST_CONFIG_FILE } from '../common/constant';

export function test(command: Config.Argv) {
  setNodeEnv('test');

  const config = {
    rootDir: ROOT,
    watch: command.watch,
    debug: command.debug,
    config: JEST_CONFIG_FILE,
    runInBand: command.runInBand,
    clearCache: command.clearCache,
    changedSince: command.changedSince,
    logHeapUsage: command.logHeapUsage,
    updateSnapshot: command.updateSnapshot,
    // make jest tests faster
    // see: https://ivantanev.com/make-jest-faster/
    maxWorkers: '50%',
  } as Config.Argv;

  jest
    .runCLI(config, [ROOT])
    .then((response) => {
      if (!response.results.success && !command.watch) {
        process.exit(1);
      }
    })
    .catch((err) => {
      console.log(err);

      if (!command.watch) {
        process.exit(1);
      }
    });
}

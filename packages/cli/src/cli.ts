import { Command } from 'commander';

import { dev, build, preview, docsBuild, clean, cliVersion, test } from '.';

const program = new Command();

program.version(`@react-vant/cli ${cliVersion}`);

program.command('dev').description('Run dev server').action(dev);

program.command('build').description('Compile components in production mode').action(build);

program.command('docs-build').description('Compile docs in production mode').action(docsBuild);

program.command('preview').description('Preview docs').action(preview);

program
  .command('test')
  .description('Run unit tests through jest')
  .option('--watch', 'Watch files for changes and rerun tests related to changed files')
  .option('--clearCache', 'Clears the configured Jest cache directory and then exits')
  .option(
    '--changedSince <changedSince>',
    'Runs tests related to the changes since the provided branch or commit hash',
  )
  .option('--logHeapUsage', 'Logs the heap usage after every test. Useful to debug memory leaks')
  .option(
    '--runInBand',
    'Run all tests serially in the current process, rather than creating a worker pool of child processes that run tests',
  )
  .option('--updateSnapshot', 'Re-record every snapshot that fails during this test run')
  .option('--debug', 'Print debugging info about your Jest config')
  .action(test);

program.command('clean').description('Clean all dist files').action(clean);

program.parse();

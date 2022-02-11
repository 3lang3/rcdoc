import { Command } from 'commander';

import {
  dev,
  clean,
  cliVersion,
} from '.';

const program = new Command();

program.version(`@react-vant/cli ${cliVersion}`);

program.command('dev').description('Run dev server').action(dev);

program.command('clean').description('Clean all dist files').action(clean);

program.parse();

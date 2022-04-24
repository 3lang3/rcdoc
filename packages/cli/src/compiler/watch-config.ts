import chokidar from 'chokidar';
import context from '../common/context';
import { genSiteEntry } from './compile-site';
import { parseConfig } from './resolve-config';

export function watchConfig() {
  // Watch rcdoc config file
  const watcher = chokidar.watch(context.configFilePath, {
    ignoreInitial: true,
  });

  watcher.on('change', async () => {
    await parseConfig(context.configFilePath);
    await genSiteEntry();
    context.server.restart();
  });

  context.watchers.push(watcher);
}

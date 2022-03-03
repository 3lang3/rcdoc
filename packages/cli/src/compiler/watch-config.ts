import chokidar from 'chokidar'
import context from '../common/context';
import { parseConfig } from './resolve-config';

export function watchConfig() {
  // Watch all md file
  const watcher = chokidar.watch(context.configFilePath, {
    ignoreInitial: true
  })

  watcher.on('change', async () => {
    console.log('update config')
    await parseConfig(context.configFilePath)
  })

  context.closes.push(() => watcher.close())
}
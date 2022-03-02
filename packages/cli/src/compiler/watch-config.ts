import watch from 'node-watch'
import context from '../common/context';
import { parseConfig } from './resolve-config';

export function watchConfig() {
  // Watch all md file
  const watcher = watch(context.configFilePath, async () => {
    console.log('update config')
    await parseConfig(context.configFilePath)
  })

  context.closes.push(watcher.close)
}
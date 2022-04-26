import context from './context';

export async function killWatchers() {
  await Promise.all(context?.watchers.map(async (watcher) => await watcher.close()));
}

export function signit() {
  process.once('SIGINT', async () => {
    await killWatchers();
    await context?.server?.close();
  });
}

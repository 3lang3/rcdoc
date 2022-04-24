import context from './context';

export async function killServer() {
  await context?.server?.close();
  context?.watchers.forEach(async (watcher) => await watcher.close());
}

export function signit() {
  process.once('SIGINT', async () => {
    await killServer();
  });
}

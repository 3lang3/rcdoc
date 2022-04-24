import type { ViteDevServer } from 'vite';
import type { DefineConfig } from './defineConfig';
import type { FSWatcher } from 'chokidar';

type ContextType = {
  opts?: DefineConfig;
  configFilePath?: string;
  server?: ViteDevServer;
  watchers: Array<FSWatcher>;
};

const context: ContextType = {
  opts: {} as DefineConfig,
  server: undefined,
  watchers: [],
};

export function init(opts: any, configFilePath: string) {
  context.opts = opts;
  context.configFilePath = configFilePath;
}

export function updateServer(server: ViteDevServer) {
  context.server = server;
}

export default context;

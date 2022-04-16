import type { ViteDevServer } from 'vite';
import type { DefineConfig } from './defineConfig';

type ContextType = {
  opts?: DefineConfig;
  configFilePath?: string;
  server?: ViteDevServer;
  closes?: Array<any>;
};

const context: ContextType = {
  opts: {} as DefineConfig,
  server: undefined,
  closes: [],
};

export function init(opts: any, configFilePath: string) {
  context.opts = opts;
  context.configFilePath = configFilePath;
}

export function updateServer(server: ViteDevServer) {
  context.server = server;
}

export default context;

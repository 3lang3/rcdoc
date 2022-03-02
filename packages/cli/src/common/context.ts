import { ViteDevServer } from "vite";

type ContextType = {
  opts?: any;
  configFilePath?: string;
  server?: ViteDevServer;
  closes?: Array<any>
}

const context: ContextType = { 
  opts: {}, 
  server: undefined, 
  closes: [] 
};

export function init(opts: any, configFilePath: string) {
  context.opts = opts;
  context.configFilePath = configFilePath
}

export function updateServer(server: ViteDevServer) {
  context.server = server;
}

export default context;
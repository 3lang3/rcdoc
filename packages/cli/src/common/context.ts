import { ViteDevServer } from "vite";

type CfgMenuItem = {
  title: string;
  path?: string;
  children?: string[]
}

type ContextType = {
  opts?: {
    menus?: Record<string, CfgMenuItem[]>;
    locales?: [string, string][];
    navs?: Record<string, CfgMenuItem[]> | CfgMenuItem[];
  } & Record<string, any>;
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
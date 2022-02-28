const context: { opts?: any; } = { opts: {} } as any;

export function init(opts: any) {
  context.opts = opts;
}


export default context;
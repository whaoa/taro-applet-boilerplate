type Middleware<T extends object> = (context: T) => (T | Promise<T>);

interface Pipeline<T extends object> {
  chain: Set<Middleware<T>>;
  execute: (context: T) => Promise<T>;
}

export function createPipeline<T extends object = any>(): Pipeline<T> {
  const chain: Pipeline<T>['chain'] = new Set();

  const execute: Pipeline<T>['execute'] = async (ctx) => {
    for (const middleware of chain.values()) {
      ctx = await middleware(ctx);
    }
    return ctx;
  };

  return { chain, execute };
}

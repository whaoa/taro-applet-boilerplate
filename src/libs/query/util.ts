import type { QueryKey } from '@tanstack/react-query';
import type { InfiniteQueryOptions, QueryOptions } from './type';

interface MakeQueryOptions<Keys extends QueryKey, Args extends QueryKey, Data> {
  keys: Keys;
  fetcher: (...args: Args) => (Data | Promise<Data>);
}

export function createQuery<
  Data = unknown,
  Args extends QueryKey = QueryKey,
  Keys extends QueryKey = QueryKey,
>(options: MakeQueryOptions<Keys, Args, Data>) {
  const { keys: baseKeys, fetcher } = options;

  const getKey = () => baseKeys;
  const getKeys = (...args: Args): [...Keys, ...Args] => [...getKey(), ...args];

  return Object.assign(fetcher, {
    getKey,
    getKeys,
    getQueryOptions(...args: Args): QueryOptions<Data, unknown, ReturnType<typeof getKeys>> {
      return {
        queryKey: getKeys(...args),
        queryFn: () => fetcher(...args),
      };
    },
  });
}

interface MakeInfiniteQueryOptions<Keys extends QueryKey, PageParam, Args extends QueryKey, Data> {
  keys: Keys;
  fetcher: (pageParam: PageParam, ...args: Args) => (Data | Promise<Data>);
  initialPageParam: PageParam;
  getNextPageParam: InfiniteQueryOptions<Data, unknown, PageParam, Keys>['getNextPageParam'];
}

export function createInfiniteQuery<
  Data = unknown,
  PageParam = unknown,
  Args extends QueryKey = QueryKey,
  Keys extends QueryKey = QueryKey,
>(options: MakeInfiniteQueryOptions<Keys, PageParam, Args, Data>) {
  const { keys: baseKeys, fetcher, initialPageParam, getNextPageParam } = options;

  const getKey = () => baseKeys;
  const getKeys = (...args: Args): [...Keys, ...Args] => [...getKey(), ...args];
  type IKeys = ReturnType<typeof getKeys>;

  return Object.assign(fetcher, {
    getKey,
    getKeys,
    getQueryOptions(...args: Args): InfiniteQueryOptions<Data, unknown, PageParam, IKeys> {
      return {
        queryKey: getKeys(...args),
        queryFn: (ctx) => fetcher(ctx.pageParam, ...args),
        initialPageParam,
        getNextPageParam,
      };
    },
  });
}

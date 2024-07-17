import {
  useInfiniteQuery as useReactInfiniteQuery,
  useQuery as useReactQuery,
  useQueryClient as useReactQueryClient,
} from '@tanstack/react-query';

import type { InfiniteQueryOptions, QueryKey, QueryOptions } from '@/libs/query/type';

export function useQueryClient() {
  return useReactQueryClient();
}

export function useQuery<
  Data = unknown,
  Err = unknown,
  Keys extends QueryKey = QueryKey,
>(options: QueryOptions<Data, Err, Keys>) {
  return useReactQuery(options);
}

export function useInfiniteQuery<
  Data = unknown,
  Err = unknown,
  PageParam = unknown,
  Keys extends QueryKey = QueryKey,
>(options: InfiniteQueryOptions<Data, Err, PageParam, Keys>) {
  const query = useReactInfiniteQuery({
    ...options,
    queryFn: (
      typeof options?.queryFn === 'function'
        ? (ctx) => options.queryFn({ ...ctx, pageParam: ctx.pageParam || options.initialPageParam })
        : undefined
    ),
  });
  if (query.data?.pageParams?.length && typeof query.data?.pageParams[0] === 'undefined') {
    query.data.pageParams[0] = options.initialPageParam;
  }
  return query;
}

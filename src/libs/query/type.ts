import type {
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import type { RequiredByKeys } from '@/types/utility';

export type QueryOptions<Data, Err, Keys extends QueryKey> = RequiredByKeys<
  UseQueryOptions<Data, Err, Data, Keys>,
  'queryKey' | 'queryFn'
>;

type InfiniteQueryFunc<Data, PageParam, Keys extends QueryKey> = (
  ctx: RequiredByKeys<Parameters<QueryFunction<Data, Keys, PageParam>>[0], 'pageParam'>
) => ReturnType<QueryFunction<Data, Keys, PageParam>>;

export type InfiniteQueryOptions<Data, Err, PageParam, Keys extends QueryKey> =
  & Omit<
    RequiredByKeys<
      UseInfiniteQueryOptions<Data, Err, Data, Data, Keys>,
      'queryKey'
    >,
    'queryFn' | 'getNextPageParam'
  >
  & {
    queryFn: InfiniteQueryFunc<Data, PageParam, Keys>;
    initialPageParam: PageParam;
    getNextPageParam: (lastPage: Data, allPages: Data[]) => (PageParam | undefined | null);
  };

export type { QueryKey } from '@tanstack/react-query';

import { useRouter as useTaroRoute } from '@tarojs/taro';

import { useMemo } from 'react';

import { getCurrentRoute, router } from '@/libs/router';

type RouteQuery<T extends Record<string, any>> = {
  [key in keyof T]?: string;
};

type DefaultRouteQuery = Record<string, string>;

export function useRoute<T extends Record<string, any> = DefaultRouteQuery>() {
  const route = useTaroRoute();
  return useMemo(() => {
    const { path, query } = getCurrentRoute();
    return { ...route, path, query: query as RouteQuery<T> };
  }, [route]);
}

export type Route<T extends Record<string, any> = DefaultRouteQuery> = (
  ReturnType<typeof useRoute<T>>
);

export function useRouter() {
  return router;
}

export type Router = ReturnType<typeof useRouter>;

import { QueryClient } from '@tanstack/react-query';

export const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      cacheTime: 0,
      retry: 1,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

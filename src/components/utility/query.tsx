import { QueryClientProvider } from '@tanstack/react-query';

import { reactQueryClient } from '@/libs/query/client';

import type { PropsWithChildren } from 'react';

export function ReactQueryProvider(props: PropsWithChildren) {
  const { children } = props;
  return (
    <QueryClientProvider client={reactQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

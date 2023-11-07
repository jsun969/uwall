'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { TRPCClientError, httpBatchLink, loggerLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { getUrl, transformer } from './shared';
import { type AppRouter } from '~/server/api/root';

export const api = createTRPCReact<AppRouter>();

const isTRPCClientError = (
  error: unknown,
): error is TRPCClientError<AppRouter> => {
  return error instanceof TRPCClientError;
};

const handleError = (error: unknown) => {
  if (isTRPCClientError(error)) {
    toast.error(`${error.data?.httpStatus}: ${error.message}`);
  }
};

export const TRPCReactProvider = (props: {
  children: React.ReactNode;
  headers: Headers;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: handleError,
        }),
        mutationCache: new MutationCache({
          onError: handleError,
        }),
      }),
  );

  const [trpcClient] = useState(() =>
    api.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: (op) =>
            process.env.NODE_ENV === 'development' ||
            (op.direction === 'down' && op.result instanceof Error),
        }),
        httpBatchLink({
          url: getUrl(),
          headers() {
            const heads = new Map(props.headers);
            heads.set('x-trpc-source', 'react');
            return Object.fromEntries(heads);
          },
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
};

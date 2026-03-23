'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

import { SnackbarProvider } from '@/components/snackbbar/SnackBarProvider';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  });

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(createQueryClient);

  return (
    <SnackbarProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SnackbarProvider>
  );
};

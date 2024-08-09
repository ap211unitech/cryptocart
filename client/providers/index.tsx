"use client";

import { useAuth } from "@/hooks";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Toaster richColors />
          <Auth />
          {children}
        </HydrationBoundary>
      </QueryClientProvider>
    </JotaiProvider>
  );
};

const Auth = () => {
  useAuth();
  return <></>;
};

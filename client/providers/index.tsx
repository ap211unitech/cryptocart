"use client";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { ReactNode, useState } from "react";
import { Toaster } from "sonner";

import { ThemeProvider } from "./theme";

import { useAuth } from "@/hooks";

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <Toaster richColors />
            <Auth />
            {children}
          </HydrationBoundary>
        </QueryClientProvider>
      </JotaiProvider>
    </ThemeProvider>
  );
};

const Auth = () => {
  useAuth();
  return <></>;
};

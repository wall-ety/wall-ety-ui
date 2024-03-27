"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import { MainLayout } from "@/ui/layout";
import { theme } from "@/ui/theme";

const clientProvider = new QueryClient();

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={clientProvider}>
      <ChakraProvider theme={theme}>
        <MainLayout>{children}</MainLayout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

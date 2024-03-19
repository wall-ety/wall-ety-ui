"use client";

import { Box, ChakraProvider, useMediaQuery } from "@chakra-ui/react";

import { AppBar } from "@/ui/layout/appBar";
import { theme } from "@/ui/theme";
import { Menu } from "@/ui/layout/menu/Menu";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <ChakraProvider theme={theme}>
      <Box width="100%" minHeight="100vh">
        <AppBar />
        <Menu />
        <Box
          width={isLargerThan800 ? "calc(100% - 250px)" : "100%"}
          ml={isLargerThan800 ? "250px" : "0"}
          bgColor="red"
        >
          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

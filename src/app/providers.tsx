"use client";

import {
  Box,
  ChakraProvider,
  useColorModeValue,
  useMediaQuery,
} from "@chakra-ui/react";

import { AppBar } from "@/ui/layout/appBar";
import { Menu } from "@/ui/layout/menu/Menu";
import { theme } from "@/ui/theme";

export function ProvidersBase({ children }: { children: React.ReactNode }) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const bgColor = useColorModeValue("white.500", "black.900");

  return (
    <Box width="100%" minHeight="100vh" bgColor={bgColor}>
      <Menu />
      <AppBar />
      <Box
        width={isLargerThan800 ? "calc(100% - 250px)" : "100%"}
        ml={isLargerThan800 ? "250px" : "0"}
        zIndex={1}
        p={2}
        minHeight="calc(100vh - 50px)"
      >
        <Box width="100%" minHeight="100%" rounded={5} mt="50px" p={3}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ProvidersBase>{children}</ProvidersBase>
    </ChakraProvider>
  );
}

"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <ChakraProvider>
      <Box width="100%" minHeight="100vh">
        <Box
          p="5"
          w="250px"
          h="100%"
          pos="fixed"
          bgColor="blue.400"
          top={0}
          left={0}
        ></Box>
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

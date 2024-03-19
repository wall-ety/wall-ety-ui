"use client";

import { 
  Box, 
  ChakraProvider, 
  useMediaQuery 
} from "@chakra-ui/react";

import { theme } from "@/ui/theme";
import { AppBar } from "@/ui/layout/appBar";

export function Providers({ children }: { children: React.ReactNode }) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  
  return (
    <ChakraProvider theme={theme}>
      <Box width="100%" minHeight="100vh">
        <AppBar />
        <Box
          p="5"
          w="250px"
          h="calc(100% - 50px)"
          pos="fixed"
          bgColor="blue.400"
          top={50}
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

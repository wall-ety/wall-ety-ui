import { Box, useColorModeValue, useMediaQuery } from "@chakra-ui/react";

import { Menu } from "./menu";
import { AppBar } from "./appbar";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const bgColor = useColorModeValue("white.500", "black.900");

  return (
    <Box width="100%" minHeight="100vh" bgColor={bgColor}>
      <Menu />
      <AppBar />
      <Box
        width={isLargerThan800 ? "calc(100% - 275px)" : "100%"}
        ml={isLargerThan800 ? "275px" : "0"}
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

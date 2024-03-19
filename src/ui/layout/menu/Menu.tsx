import { Box } from "@chakra-ui/react";

export function Menu() {
  return (
    <Box
      p="5"
      w="250px"
      h="calc(100% - 50px)"
      pos="fixed"
      bgColor="blue.400"
      top="52px"
      left={0}
    ></Box>
  );
}

import { Box, Text, useColorMode } from "@chakra-ui/react";

type MenuGroupProps = {
  label: string;
  children: React.ReactNode;
};

export function MenuGroup({ label, children }: MenuGroupProps) {
  const { colorMode } = useColorMode();
  return (
    <Box width="100%" my={2}>
      <Text
        color={colorMode === "light" ? "main" : "white.900"}
        fontSize="16px"
        ml={3}
        fontWeight="bold"
      >
        {label}
      </Text>
      <Box pl={5} width="100%">
        {children}
      </Box>
    </Box>
  );
}

import { Box, Text } from "@chakra-ui/react";

type MenuGroupProps = {
  label: string;
  children: React.ReactNode;
};

export function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <Box width="100%" my={2}>
      <Text color="main" fontSize="14px" ml={3} fontWeight="bold">
        {label}
      </Text>
      <Box pl={5} width="100%">
        {children}
      </Box>
    </Box>
  );
}

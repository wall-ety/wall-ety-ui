import React from "react";
import { Box, StyleProps } from "@chakra-ui/react";

export function FlexBox({
  children,
  sx,
}: {
  children: React.ReactNode;
  sx?: StyleProps;
}) {
  return (
    <Box display="flex" alignItems="center" sx={sx}>
      {children}
    </Box>
  );
}

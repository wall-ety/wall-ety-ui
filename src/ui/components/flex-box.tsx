import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

export function FlexBox({ children, ...props }: BoxProps) {
  return (
    <Box display="flex" alignItems="center" {...props}>
      {children}
    </Box>
  );
}

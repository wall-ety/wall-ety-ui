import { Box, BoxProps, useColorModeValue } from "@chakra-ui/react";

export function Separator(props: BoxProps) {
  const separatorBgColor = useColorModeValue("black.500", "white.500");
  return (
    <Box
      sx={{
        bgColor: separatorBgColor,
        mt: 2,
        mb: 5,
        opacity: .7,
        h: "1px"
      }}
      {...props}
    />
  )
}

"use client";

import { useColorModeValue } from "@chakra-ui/react";

export function usePaletteColor() {
  const secondText = useColorModeValue("grey", "#a4a7ab");
  const primaryText = useColorModeValue("white.500", "black.900");

  return {
    secondText,
    primaryText,
  };
}

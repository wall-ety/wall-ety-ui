"use client";

import { useColorModeValue } from "@chakra-ui/react";

export function usePaletteColor() {
  const secondText = useColorModeValue("grey", "#a4a7ab");
  const primaryText = useColorModeValue("white.500", "black.900");
  const icolor500 = useColorModeValue("black.500", "white.500");
  const icolor900 = useColorModeValue("black.900", "white.900");

  return {
    secondText,
    primaryText,
    icolor500,
    icolor900,
  };
}

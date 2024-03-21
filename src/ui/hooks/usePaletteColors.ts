import { useColorModeValue } from "@chakra-ui/react";

export function usePaletteColors() {
  const text = useColorModeValue("black.900", "white.900");
  const bgColor = useColorModeValue("white.900", "black.900");

  return {
    text,
    bgColor,
  };
}

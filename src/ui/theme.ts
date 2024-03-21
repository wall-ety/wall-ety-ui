import { extendTheme } from "@chakra-ui/react";

// main theme
export const theme = extendTheme({
  colors: {
    main: "#698ef5",
    black: {
      900: "#292727",
      500: "#5c5b5b",
      300: "#636362",
    },
    grey: "#818585",
    white: {
      900: "#fcfcfc",
      500: "#e6e8eb",
    },
  },
  initialColorMode: "light",
  useSystemColorMode: false,
});

export const PALETTE_COLORS = {
  main: "#698ef5",
  black: "#4c4d4f",
  grey: "#818585",
  white: "#fcfcfc",
};

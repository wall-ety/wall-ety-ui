import { extendTheme } from "@chakra-ui/react";

// main theme
export const theme = extendTheme({
  colors: {
    main: "#598ceb",
    black: {
      900: "#292727",
      800: "#333232",
      700: "#292828",
      600: "#5a5b5c",
      500: "#5c5b5b",
      300: "#636362",
    },
    grey: "#818585",
    white: {
      900: "#fcfcfc",
      500: "#e6e8eb",
    },
  },
  initialColorMode: "ligth",
  useSystemColorMode: false,
});

export const PALETTE_COLORS = {
  main: "#698ef5",
  black: "#4c4d4f",
  grey: "#818585",
  white: "#fcfcfc",
  red: "#de0017",
  green: "#32993b",
};

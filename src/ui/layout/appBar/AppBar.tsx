import { Box, Button, IconButton, Image, Text } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import logo from "@/assets/images/logo.png";

export function AppBar() {
  return (
    <Box
      sx={{
        height: "50px",
        py: 0,
        pr: 5,
        w: "100%",
        bgColor: "white",
        boxShadow: "5px 5px 5px #f3f",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        gap={2}
        px={5}
        display="flex"
        width="250px"
        alignItems="center"
        position="relative"
      >
        <Image
          alt="Wallety"
          src={logo.src}
          sx={{
            width: "30px",
            display: "block",
          }}
        />
        <Text
          fontFamily="sans-serif"
          fontSize="1rem"
          color="black"
          fontWeight="bold"
        >
          Wallety
        </Text>
        <IconButton
          right="0"
          variant="ghost"
          aria-label="menu-button"
          position="absolute"
        >
          <HamburgerIcon color="black" />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" gap={2}>
        <Button size="sm">Logout</Button>
      </Box>
    </Box>
  );
}

import {
  Avatar,
  Box,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  AvatarBadge,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Notifications,
  ExpandMoreOutlined,
  Search as SearchIcon,
  Brightness5 as LightIcon,
  Brightness7 as DarkIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

import logo from "@/assets/images/logo.png";

function UserInfo() {
  return (
    <Menu>
      <MenuButton
        variant="ghost"
        textAlign="start"
        as={Button}
        rightIcon={<ExpandMoreOutlined />}
      >
        <Box display="flex" alignItems="center" gap={4} mx={2}>
          <Avatar
            size="sm"
            display="block"
            name="John Doe"
            src="/default_profile.jpg"
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontWeight="bold" fontSize="14px">
              John Doe
            </Text>
            <Text fontWeight="normal" fontSize="14px">
              Client
            </Text>
          </Box>
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem>Download</MenuItem>
        <MenuItem>Create a Copy</MenuItem>
        <MenuItem>Mark as Draft</MenuItem>
        <MenuItem>Delete</MenuItem>
        <MenuItem>Attend a Workshop</MenuItem>
      </MenuList>
    </Menu>
  );
}

export function AppBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white.900", "black.800");

  return (
    <Box
      sx={{
        height: "50px",
        py: 0,
        pr: 5,
        w: "100%",
        zIndex: 999,
        bgColor: bgColor,
        borderBottom:
          colorMode === "light" ? "1px solid #f3f0f0" : "1px solid grey",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        gap={2}
        pl={5}
        display="flex"
        width="250px"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          "& .MuiSvgIcon-root": {
            fontSize: "14px",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={4}>
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
            color={colorMode === "light" ? "black.700" : "white.900"}
            fontSize="1rem"
            fontWeight="bold"
          >
            Wallety
          </Text>
        </Box>
        <IconButton aria-label="notification-icon" variant="ghost">
          <MenuIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <InputGroup size="sm" width={250} variant="filled">
          <Input placeholder="Type to search" />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <IconButton aria-label="notification-icon" variant="ghost">
          <Notifications sx={{ fontSize: 20 }} />
        </IconButton>
        <IconButton
          aria-label="toggle-mode-button"
          variant="ghost"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? (
            <DarkIcon sx={{ fontSize: 20 }} />
          ) : (
            <LightIcon sx={{ fontSize: 20 }} />
          )}
        </IconButton>
        <UserInfo />
      </Box>
    </Box>
  );
}

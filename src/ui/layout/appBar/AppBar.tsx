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
  Badge,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  BellIcon,
  ChevronDownIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import logo from "@/assets/images/logo.png";

function UserInfo() {
  return (
    <Menu>
      <MenuButton
        variant="ghost"
        textAlign="start"
        as={Button}
        rightIcon={<ChevronDownIcon />}
      >
        <Box display="flex" alignItems="center" gap={4} mx={2}>
          <Avatar
            size="sm"
            display="block"
            name="John Doe"
            src="default_profile.jpg"
          >
            <AvatarBadge boxSize="1.25em" bg="green.500" />
          </Avatar>
          <Box>
            <Text fontWeight="bold" color="black" fontSize="14px">
              John Doe
            </Text>
            <Text color="grey" fontWeight="normal" fontSize="14px">
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
      <Box display="flex" alignItems="center" gap={1}>
        <InputGroup size="sm" width={250} variant="filled">
          <Input placeholder="Type to search" />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
        <IconButton aria-label="notification-icon" variant="ghost">
          <BellIcon fontSize={20} color="black" />
        </IconButton>
        <UserInfo />
      </Box>
    </Box>
  );
}

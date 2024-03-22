import { Box, useColorModeValue } from "@chakra-ui/react";
import { AccountBalance, GitHub, Person } from "@mui/icons-material";

import { MenuGroup, MenuItem, MenuList, SingleMenu } from "./components";

export function Menu() {
  const bgColor = useColorModeValue("white.900", "black.800");

  return (
    <Box
      sx={{
        py: 2,
        w: "250px",
        h: "calc(100% - 50px)",
        pos: "fixed",
        bgColor,
        top: "50px",
        left: 0,
      }}
      borderRight="1px 1px 1px white"
    >
      <MenuGroup label="Accounts">
        <SingleMenu
          label="Profile"
          icon={<Person sx={{ fontSize: "14px" }} />}
        />
        <MenuList label="Banks" icon={<AccountBalance />}>
          <MenuItem label="Lists here" icon={<GitHub />} />
          <MenuItem label="Lists here" icon={<GitHub />} />
        </MenuList>
      </MenuGroup>
      <MenuGroup label="Test">
        <MenuList label="Banks" icon={<AccountBalance />}>
          <MenuItem label="Lists here" icon={<GitHub />} />
          <MenuItem label="Lists here" icon={<GitHub />} />
        </MenuList>
      </MenuGroup>
    </Box>
  );
}

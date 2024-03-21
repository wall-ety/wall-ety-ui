import { Box } from "@chakra-ui/react";
import { AccountBalance, GitHub, Person } from "@mui/icons-material";

import { MenuGroup, MenuItem, MenuList, SingleMenu } from "./components";

export function Menu() {
  return (
    <Box
      sx={{
        py: 2,
        w: "250px",
        h: "calc(100% - 50px)",
        pos: "fixed",
        bgColor: "white",
        top: "52px",
        left: 0,
      }}
    >
      <MenuGroup label="Accounts">
        <SingleMenu
          label="Profile"
          icon={<Person sx={{ fontSize: "14px", color: "black" }} />}
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

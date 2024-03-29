import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import {
  AccountBalance,
  Category as CategoryIcon,
  Paid,
  Person,
  TransferWithinAStation,
} from "@mui/icons-material";

import { MenuItem, MenuList, SingleMenu } from "./components";
import { usePaletteColor } from "@/ui/hooks";

export function Menu() {
  const bgColor = useColorModeValue("white.900", "black.800");
  const { icolor900 } = usePaletteColor();

  return (
    <Box
      sx={{
        py: 2,
        w: "275px",
        h: "calc(100% - 50px)",
        pos: "fixed",
        bgColor,
        top: "50px",
        left: 0,
      }}
      borderRight="1px 1px 1px white"
    >
      <Text
        sx={{
          width: "100%",
          fontSize: "15px",
          px: 4,
          fontWeight: "bold",
          color: icolor900,
          my: 4,
        }}
      >
        MENU
      </Text>
      <SingleMenu
        to="/clients"
        label="Clients"
        icon={<Person sx={{ fontSize: "14px" }} />}
      />
      <SingleMenu to="/banks" label="Banks" icon={<AccountBalance />} />
      <SingleMenu to="/categories" label="Categories" icon={<CategoryIcon />} />
      <MenuList label="Transactions" icon={<Paid />}>
        <MenuItem
          icon={<TransferWithinAStation />}
          label="Transfers"
          to="/transfers"
        />
        <MenuItem
          icon={<TransferWithinAStation />}
          label="Transactions"
          to="/transactions"
        />
      </MenuList>
    </Box>
  );
}

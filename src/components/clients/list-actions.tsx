import { Button } from "@chakra-ui/react";
import { Edit as EditIcon } from "@mui/icons-material";

import { ListActions } from "@/ui/components/list";
import { Client } from "@/gen/client";

export function ClientListActions({ data }: { data: Client }) {
  return (
    <ListActions>
      <Button
        leftIcon={<EditIcon sx={{ fontSize: "15px" }} />}
        colorScheme="yellow"
        size="sm"
        fontSize="14px"
      >
        Edit
      </Button>
    </ListActions>
  );
}

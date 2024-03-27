import { ListActions } from "@/ui/components/list";
import { Client } from "@/gen/client";
import { EditClient } from "../mutation/edit";

export function ClientListActions({ data }: { data: Client }) {
  return (
    <ListActions sx={{ width: "15%" }}>
      <EditClient data={data} />
    </ListActions>
  );
}

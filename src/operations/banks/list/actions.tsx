import { ListActions } from "@/ui/components/list";
import { Bank } from "@/gen/client";
import { EditBank } from "../mutation/edit";

export function BankListActions({ data }: { data: Bank }) {
  return (
    <ListActions sx={{ width: "15%" }}>
      <EditBank data={data} />
    </ListActions>
  );
}

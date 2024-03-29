import { ListActions } from "@/ui/components/list";
import { Account } from "@/gen/client";
import { EditAccount } from "../mutation/edit";

export function AccountListActions({ data }: { data: Account }) {
  return (
    <ListActions sx={{ width: "20%" }}>
      <EditAccount data={data} />
    </ListActions>
  );
}

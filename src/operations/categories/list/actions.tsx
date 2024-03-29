import { ListActions } from "@/ui/components/list";
import { Category } from "@/gen/client";
import { EditCategory } from "../mutation/edit";

export function CategoryListActions({ data }: { data: Category }) {
  return (
    <ListActions sx={{ width: "20%" }}>
      <EditCategory data={data} />
    </ListActions>
  );
}

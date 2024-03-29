import { Category } from "@/gen/client";
import { EditMutation } from "@/ui/components/mutation";
import { CategoryFields } from "./fields";

import { categoryProvider } from "@/providers/category-provider";

export function EditCategory({ data }: { data: Category }) {
  const updateProvider = (toSave: Category) =>
    categoryProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const transform = (category: Category): Category => {
    const currentDate = new Date().toISOString();

    return {
      ...category,
      updatedAt: currentDate,
    };
  };

  return (
    <EditMutation
      source="categorys"
      title={`Edit ${data.name}`}
      data={data}
      defaultValue={data}
      transform={transform}
      provider={updateProvider}
    >
      <CategoryFields />
    </EditMutation>
  );
}

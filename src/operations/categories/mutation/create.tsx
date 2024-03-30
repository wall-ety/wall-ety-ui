import { v4 as uuid } from "uuid";

import { Category } from "@/gen/client";
import { CreateMutation } from "@/ui/components/mutation";
import { CategoryFields } from "./fields";

import { categoryProvider } from "@/providers/category-provider";

export function CreateCategory() {
  const createProvider = (toSave: Category) =>
    categoryProvider.saveOrUpdate([toSave]).then((response) => response[0]);

  const defaultValue: Category = {
    name: "",
  };

  const transform = (category: Category): Category => {
    const currentDate = new Date().toISOString();

    return {
      ...category,
      id: uuid(),
      updatedAt: currentDate,
      createdAt: currentDate,
    };
  };

  return (
    <CreateMutation
      source={["categories"]}
      title="Create category"
      transform={transform}
      provider={createProvider}
      defaultValue={defaultValue}
    >
      <CategoryFields />
    </CreateMutation>
  );
}

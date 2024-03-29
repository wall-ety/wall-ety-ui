import { ChangeEvent, useState } from "react";
import { Select, Text, Box } from "@chakra-ui/react";
import { Category, CategoryType } from "@/gen/client";
import { List, LabelType, useOrder } from "@/ui/components/list";
import { CreateCategory } from "@/operations/categories/mutation";
import { CategoryListActions } from "./actions";
import { FlexBox, Separator } from "@/ui/components";

import { categoryProvider } from "@/providers/category-provider";

import { formatDate } from "@/utils/date";

function SelectCategoryType({
  onChange,
}: {
  onChange: (value: CategoryType | undefined) => void;
}) {
  return (
    <>
      <Separator />
      <FlexBox sx={{ gap: 2, mb: 5, width: "300px" }}>
        <Box sx={{ width: "150px" }}>
          <Text sx={{ fontSize: "14px" }}>Category type:</Text>
        </Box>
        <Select
          size="sm"
          placeholder="No filter"
          variant="filled"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange(e.target.value as CategoryType | undefined)
          }
        >
          <option value={CategoryType.All}>ALL</option>
          <option value={CategoryType.Debit}>Debits</option>
          <option value={CategoryType.Credit}>Credits</option>
        </Select>
      </FlexBox>
      <Separator />
    </>
  );
}

export function CategoryList() {
  const { handleChange, orderValue } = useOrder<Category>({
    orderBy: "updatedAt",
    order: "DESC",
  });
  const [typeFilter, setTypeFilter] = useState<CategoryType | undefined>(
    undefined
  );

  const labels: LabelType<Category>[] = [
    { source: "name", label: "Name", size: "15%" },
    { source: "type", label: "Transaction type", size: "15%" },
    {
      label: "Created at",
      size: "22%",
      render: (category) => formatDate(category.createdAt!, true),
    },
    {
      label: "Updated at",
      size: "22%",
      render: (category) => formatDate(category.updatedAt!, true),
    },
    { label: "", component: CategoryListActions, size: "20%" },
  ];

  return (
    <List
      labels={labels}
      source="categorys"
      keys={[typeFilter, orderValue.orderBy, orderValue.order]}
      provider={() =>
        categoryProvider.getAll(typeFilter || undefined, orderValue)
      }
      overviewProps={{
        leftButton: <CreateCategory />,
        content: (
          <SelectCategoryType
            onChange={(e: CategoryType | undefined) => setTypeFilter(e)}
          />
        ),
        orders: {
          current: orderValue,
          handleChange,
          queries: [
            { value: "name", label: "Name" },
            { value: "updatedAt", label: "Modification" },
            { value: "createdAt", label: "Creation" },
          ],
        },
      }}
    />
  );
}

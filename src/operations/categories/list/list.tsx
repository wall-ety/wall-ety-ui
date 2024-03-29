import { Box } from "@chakra-ui/react";
import { Check, Close } from "@mui/icons-material";

import { Category } from "@/gen/client";
import { List, LabelType } from "@/ui/components/list";
import { CreateCategory } from "@/operations/categories/mutation";
import { CategoryListActions } from "./actions";

import { categoryProvider } from "@/providers/category-provider";

import { formatDate } from "@/utils/date";

export function CategoryList() {
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
      title="Create category"
      provider={categoryProvider.getAll}
      overviewProps={{
        content: <CreateCategory />,
      }}
    />
  );
}

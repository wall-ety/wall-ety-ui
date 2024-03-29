import { useQuery } from "@tanstack/react-query";
import { Box, Heading } from "@chakra-ui/react";
import { AttachMoney, Comment as CommentIcon } from "@mui/icons-material";

import {
  SelectInput,
  TextAreaInput,
  TextInput,
} from "@/ui/components/mutation/inputs";
import { TransactionType } from "@/gen/client";
import { min, number, required } from "@/ui/utils/formik/validate";
import { categoryProvider } from "@/providers/category-provider";

export function TransactionFields() {
  const { data: categories } = useQuery({
    queryFn: () => categoryProvider.getAll(undefined, {}),
    queryKey: ["categories"],
  });

  const categoriesLabels = (categories || []).map((category) => {
    return { label: category.name!, value: category.id! };
  });

  const transactionLabels = [
    { label: "Debit", value: TransactionType.Debit },
    { label: "Credit", value: TransactionType.Credit },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextInput
        name="label"
        placeholder="Label"
        label="Label"
        icon={<CommentIcon />}
        validate={[required()]}
      />
      <TextInput
        name="amount"
        placeholder="Amount"
        label="Amount"
        icon={<AttachMoney />}
        validate={[required(), number(), min(1)]}
      />
      <SelectInput
        required
        name="idCategory"
        label="Category"
        options={categoriesLabels}
      />
      <SelectInput
        required
        name="type"
        label="Transaction Type"
        options={transactionLabels}
      />
      <TextAreaInput
        name="reason"
        placeholder="Reason"
        label="Reason"
        validate={[required()]}
      />
    </Box>
  );
}

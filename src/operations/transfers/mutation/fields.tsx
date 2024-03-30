import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import {
  AttachMoney,
  Comment as CommentIcon,
  DateRange,
} from "@mui/icons-material";
import {
  SelectInput,
  SwitchInput,
  TextAreaInput,
  TextInput,
} from "@/ui/components/mutation/inputs";

import { min, number, required } from "@/ui/utils/formik/validate";
import { categoryProvider } from "@/providers/category-provider";
import { accountProvider } from "@/providers/account-provider";
import { CategoryType } from "@/gen/client";

export function TransferFields({ accountId }: { accountId: string }) {
  const { data: accounts } = useQuery({
    queryFn: () =>
      accountProvider.getAll(
        { orderBy: "name", order: "ASC" },
        undefined,
        undefined
      ),
    queryKey: ["accounts"],
  });

  const { data: categories } = useQuery({
    queryFn: () => categoryProvider.getAll(CategoryType.All, {}),
    queryKey: ["categories"],
  });

  const categoriesLabels = (categories || []).map((category) => {
    return { label: category.name!, value: category.id! };
  });
  console.log(accountId);
  const accountsLabels = (accounts || [])
    .filter((account) => account.id !== accountId)
    .map((account) => {
      return { label: account.name!, value: account.id! };
    });

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
      <TextInput
        name="effectiveDatetime"
        placeholder="Effective Date"
        label="Effective Date"
        type="datetime-local"
        icon={<DateRange />}
      />
      <SelectInput
        required
        name="idCategory"
        label="Category"
        options={categoriesLabels}
      />
      <SelectInput
        required
        name="idDestination"
        label="Destination"
        options={accountsLabels}
      />
      <TextAreaInput
        name="reason"
        placeholder="Reason"
        label="Reason"
        validate={[required()]}
      />
      <SwitchInput label="From different bank ?" name="externBank" />
    </Box>
  );
}

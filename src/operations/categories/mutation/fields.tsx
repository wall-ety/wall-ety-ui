import { Box } from "@chakra-ui/react";
import { Category as CategoryIcon } from "@mui/icons-material";

import { SelectInput, TextInput } from "@/ui/components/mutation/inputs";
import { CategoryType } from "@/gen/client";
import { required } from "@/ui/utils/formik/validate";

export function CategoryFields() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextInput
        name="name"
        placeholder="Name"
        label="Name"
        icon={<CategoryIcon />}
        validate={[required()]}
      />
      <SelectInput
        required
        name="type"
        label="Type"
        options={[
          { label: CategoryType.All, value: CategoryType.All },
          { label: CategoryType.Credit, value: CategoryType.Credit },
          { label: CategoryType.Debit, value: CategoryType.Debit },
        ]}
      />
    </Box>
  );
}

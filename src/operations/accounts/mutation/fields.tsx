import { useQuery } from "@tanstack/react-query";
import { Box } from "@chakra-ui/react";
import { AccountBalance as AccountNameIcon } from "@mui/icons-material";

import {
  SelectInput,
  SwitchInput,
  TextInput,
} from "@/ui/components/mutation/inputs";
import { required } from "@/ui/utils/formik/validate";
import { clientProvider } from "@/providers/client-provider";
import { bankProvider } from "@/providers/bank-provider";

export function AccountFields() {
  const { data: banks } = useQuery({
    queryFn: () => bankProvider.getAll({ orderBy: "name", order: "DESC" }),
    queryKey: ["banks"],
  });

  const { data: clients } = useQuery({
    queryFn: () =>
      clientProvider.getAll({ orderBy: "firstName", order: "DESC" }),
    queryKey: ["clients"],
  });

  const clientOptions = (clients || []).map((client) => {
    return { label: client.firstName!, value: client.id! };
  });

  const bankOptions = (banks || []).map((bank) => {
    return { label: bank.name!, value: bank.id! };
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextInput
        name="name"
        placeholder="Name"
        label="Name"
        icon={<AccountNameIcon />}
        validate={[required()]}
      />
      <SelectInput
        required
        name="idClient"
        label="Owner"
        options={clientOptions}
      />
      <SelectInput
        required
        name="idBank"
        label="Bank name"
        options={bankOptions}
      />
      <SwitchInput name="authorizeCredits" label="Authorize Credits ? " />
    </Box>
  );
}

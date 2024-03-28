import { Box } from "@chakra-ui/react";
import {
  AccountBalance as BankNameIcon,
  CreditScore as LoanIcon
} from "@mui/icons-material";

import { SwitchInput, TextInput } from "@/ui/components/mutation/inputs";
import { min, number, required } from "@/ui/utils/formik/validate";

export function BankFields() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextInput
        name="name"
        placeholder="Name"
        label="Name"
        icon={<BankNameIcon />}
        validate={[required()]}
      />
      <TextInput
        name="firstWeekLoan"
        placeholder="First Week Loan"
        label="First Week Loan"
        icon={<LoanIcon />}
        validate={[number(), min(0.0001)]}
      />
      <TextInput
        name="subsequentLoan"
        placeholder="Subsequent Loan"
        label="Subsequent Loan"
        icon={<LoanIcon />}
        validate={[number(), min(0.0001)]}
      />
      <SwitchInput
        name="authorizeCredits"
        label="Authorize Credits ? "
      />
    </Box>
  );
}

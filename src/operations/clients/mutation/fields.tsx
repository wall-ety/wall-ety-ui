import { Box } from "@chakra-ui/react";
import {
  Person as PersonIcon,
  Cake as BirthdateIcon,
  AttachMoney,
} from "@mui/icons-material";

import { TextInput } from "@/ui/components/mutation/inputs";
import { min, required } from "@/ui/utils/formik/validate";
import { getAge } from "@/utils/date";

const MIN_AGE = 22;

export function ClientFields() {
  const validateAge = (_: string, value: any) => {
    try {
      if (!(getAge(value) >= MIN_AGE)) {
        return `Minimum age is ${MIN_AGE}`;
      }
    } catch {
      return "Not a valide date";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <TextInput
        name="firstName"
        placeholder="First Name"
        label="First Name"
        icon={<PersonIcon />}
        validate={[required()]}
      />
      <TextInput
        name="lastName"
        placeholder="Last Name"
        label="Last Name"
        icon={<PersonIcon />}
        validate={[required()]}
      />
      <TextInput
        label="Birthdate"
        name="birthdate"
        type="date"
        placeholder="Birthdate"
        icon={<BirthdateIcon />}
        validate={[validateAge]}
      />
      <TextInput
        name="monthSalary"
        placeholder="Month Salary"
        label="Month Salary"
        icon={<AttachMoney />}
        validate={[required(), min(1)]}
      />
    </Box>
  );
}

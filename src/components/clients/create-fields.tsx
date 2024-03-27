import { TextInput } from "@/ui/components/create/inputs"
import { Box } from "@chakra-ui/react"

export function ClientCreateFields() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <TextInput
        name="firstName"
        placeholder="First Name"
        label="First Name"
      />
      <TextInput
        name="lastName"
        placeholder="Last Name"
        label="Last Name"
      />
      <TextInput
        name="monthSalary"
        placeholder="Month Salary"
        label="Month Salary"
      />
      <TextInput
        name="birthdate"
        placeholder="BirthDate"
        label="BirthDate"
      />
    </Box>
  )
}

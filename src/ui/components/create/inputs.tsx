import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react"
import { Field } from "formik"

type TextFieldProps = {
  name: string,
  validate?: any,
  label: string,
  placeholder?: string
}

export function TextInput({ name, validate, label, placeholder }: TextFieldProps) {
  return (
    <Field name={name} validate={validate}>
      {({ field, form }: any) => (
        <FormControl isInvalid={form.errors.name && form.touched.name}>
          <FormLabel>{label}</FormLabel>
          <Input {...field} placeholder={placeholder} />
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

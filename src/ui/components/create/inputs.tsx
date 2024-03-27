import { HTMLInputTypeAttribute } from "react"
import { Field } from "formik"
import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react"

import { usePaletteColor } from "@/ui/hooks"

type TextFieldProps = {
  name: string,
  label: string,
  validate?: ((fieldName: string, values: any) => string | undefined)[],
  type?: HTMLInputTypeAttribute
  placeholder?: string,
  icon: React.ReactElement
}

export function TextInput({
  name,
  validate,
  label,
  placeholder,
  type,
  icon
}: TextFieldProps) {
  const { secondText } = usePaletteColor();

  const validateValue = (value: any) => {
    if (!validate) {
      return undefined;
    }

    for (let validateFn of validate) {
      const error = validateFn(name, value);

      if (error) {
        return error;
      }
    }

    return undefined;
  }

  return (
    <Field name={name} validate={validateValue}>
      {({ field, form }: any) => {
        const errorMessage = form.errors[name];

        return (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel sx={{ fontSize: "14px" }}>{label}</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                sx={{
                  color: secondText,
                  '& .MuiSvgIcon-root': {
                    fontSize: "18px",
                    color: secondText
                  }
                }}
              >
                {icon}
              </InputLeftElement>
              <Input type={type} {...field} placeholder={placeholder} />
            </InputGroup>
            {errorMessage && (
              <Text color="red.400" sx={{ fontSize: "13px", mt: 1, ml: 1 }}>
                {form.errors[name]}
              </Text>
            )}
          </FormControl>
        )
      }}
    </Field>
  )
}

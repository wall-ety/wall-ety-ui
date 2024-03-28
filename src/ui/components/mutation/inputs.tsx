import { HTMLInputTypeAttribute } from "react";
import { Field, useFormikContext } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Switch
} from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import { usePaletteColor } from "@/ui/hooks";

type FieldProps = {
  name: string;
  label: string;
  validate?: ((fieldName: string, values: any) => string | undefined)[];
}

type TextFieldProps = {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  icon: React.ReactElement;
} & FieldProps;

export function SwitchInput({ label, name }: FieldProps) {
  const id = uuid();
  const { handleChange, values } = useFormikContext();
  const anyValues: any = values;

  return (
    <Field name={name}>
      {() => (
        <FormControl display='flex' alignItems='center' gap={2}>
          <FormLabel htmlFor={id} fontSize="15px">
            {label}
          </FormLabel>
          <Switch mb={1} isChecked={anyValues[name]} onChange={handleChange} id={id} name={name} />
        </FormControl>
      )}
    </Field>
  )
}

export function TextInput({
  name,
  validate,
  label,
  placeholder,
  type,
  icon,
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
  };

  return (
    <Field name={name} validate={validateValue}>
      {({ field, form }: any) => {
        const errorMessage = form.errors[name];

        return (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <FormLabel sx={{ fontSize: "14px" }}>{label}</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                sx={{
                  "color": secondText,
                  "& .MuiSvgIcon-root": {
                    fontSize: "18px",
                    color: secondText,
                  },
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
        );
      }}
    </Field>
  );
}

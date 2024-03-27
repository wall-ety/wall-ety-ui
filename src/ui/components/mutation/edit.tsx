import { Edit as EditIcon } from "@mui/icons-material";
import { Mutation, MutationProps } from "./mutation";

type EditMutationProps<T> = {
  data: T
} & MutationProps<T>

export function EditMutation<T>({ data, ...mutationProps }: EditMutationProps<T>) {
  return (
    <Mutation
      title="Edit"
      defaultValue={data}
      buttons={{
        toggle: {
          label: "Edit",
          props: {
            colorScheme: "yellow",
            sx: { my: 0 },
            leftIcon: <EditIcon sx={{ fontSize: "18px" }} />
          }
        },
        accept: {
          label: "Save",
          props: { colorScheme: "yellow" }
        }
      }}
      successToast={{
        title: "Updated",
        description: "Your resource has been updated with success"
      }}
      {...mutationProps}
    />
  )
}

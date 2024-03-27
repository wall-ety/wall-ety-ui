import { Mutation, MutationProps } from "./mutation";

export function CreateMutation<T>(props: MutationProps<T>) {
  return <Mutation {...props} />;
}

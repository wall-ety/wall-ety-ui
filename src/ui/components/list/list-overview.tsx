import {
  Text,
  Box,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import { AxiosError } from "axios";
import { CreateContent } from "./create-content";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export type OverviewProps<T> = {
  content: React.ReactElement,
  provider: (toSave: T) => Promise<T>,
  source: string
  title: string,
  defaultValue: T,
  transform?: (toSave: T) => T | any
};

//TODO: show som information
export function ListOverview<T>({
  source,
  title,
  content,
  provider,
  defaultValue,
  transform
}: OverviewProps<T>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate: doMutation, isPending, isError } = useMutation<T, AxiosError, T>({
    mutationFn: provider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [source] })
    },
  })

  const doSubmit = (values: T) => transform ? doMutation(transform(values)) : doMutation(values);

  return (
    <>
      <Box sx={{ mb: 5 }}>
        <Text sx={{ fontSize: "1.5rem", fontWeight: 600 }}>Overview</Text>
        <Button
          size="sm"
          colorScheme="blue"
          onClick={onOpen}
          isLoading={isPending}
          sx={{ my: 2, px: 7, fontSize: "15px" }}
        >
          Créer
        </Button>
      </Box>
      <CreateContent<T>
        isPending={isPending}
        isOpen={isOpen}
        onSubmit={doSubmit}
        onClose={onClose}
        title={title}
        defaultValue={defaultValue}
      >
        {content}
      </CreateContent>
    </>
  );
}

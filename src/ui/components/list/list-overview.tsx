import { useState } from "react";
import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContent,
  useDisclosure,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CreateContent } from "./create-content";

export type OverviewProps<T> = {
  createContent: React.ReactElement,
  createProvider: (toSave: T) => Promise<T>,
  source: string
  title: string,
};

//TODO: show som information
export function ListOverview<T>({
  source,
  title,
  createContent,
  createProvider,
}: OverviewProps<T>) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toSave, setToSave] = useState<T | null>(null);
  const queryClient = useQueryClient();

  const { mutate: doMutation, isPending, isError } = useMutation<T, AxiosError, T>({
    mutationFn: createProvider,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [source] })
    },
  })

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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader sx={{ fontSize: "16px" }}>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateContent onSubmit={(values) => doMutation(values)}>
              {createContent}
            </CreateContent>
          </ModalBody>
          <ModalFooter>
            <Button
              size="sm"
              colorScheme="red"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button size="sm" colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

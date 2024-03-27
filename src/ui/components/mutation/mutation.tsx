import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { Form, Formik, FormikValues } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Add as AddIcon } from "@mui/icons-material";

import { ApiErrorResponse } from "@/gen/client";
import { useToast } from "@/ui/hooks";

type MutationButton = {
  label?: string,
  props?: ButtonProps,
}

export type MutationProps<T> = {
  children: React.ReactNode;
  source: string;
  title?: string;
  defaultValue?: T;
  successToast?: {
    title?: string,
    description?: string
  },
  buttons?: {
    toggle?: MutationButton
    cancel?: MutationButton,
    accept?: MutationButton
  },
  provider: (toSave: T) => Promise<T>;
  transform?: (toSave: T | any) => T | any;
};

export function Mutation<T>({
  children,
  defaultValue,
  title,
  provider,
  source,
  transform,
  buttons,
  successToast
}: MutationProps<T>) {
  const toast = useToast();
  const modalBgColor = useColorModeValue("white.900", "#434544");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<T, AxiosError<ApiErrorResponse>, T>(
    {
      mutationFn: provider,
      retry: false,
      onError: (error) => {
        toast({
          title: error.response?.data.message,
          description: `Exit with status code ${error.response?.data.code}`,
          status: "error",
        });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [source] });
        toast({
          title: successToast?.title || "Created",
          description: successToast?.description || "Your resource have been created with sucess",
          status: "success",
        });
        onClose();
      },
    }
  );

  const doSubmit = (values: T) =>
    transform ? mutate(transform(values)) : mutate(values);

  return (
    <>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={onOpen}
        leftIcon={<AddIcon />}
        isLoading={isPending}
        sx={{ my: 2, px: 3, fontSize: "15px" }}
        {...buttons?.toggle?.props}
      >
        {buttons?.toggle?.label || "Create"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent sx={{ bgColor: modalBgColor }}>
          <Formik
            initialValues={defaultValue || {} as FormikValues}
            onSubmit={(values, actions) => {
              doSubmit(values as T);
              actions.setSubmitting(false);
            }}
          >
            {() => (
              <Form>
                <ModalHeader sx={{ fontSize: "16px" }}>{title || "Create"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    mr={5}
                    onClick={onClose}
                    {...buttons?.cancel?.props}
                  >
                    {buttons?.cancel?.label || "Cancel"}
                  </Button>
                  <Button
                    isLoading={isPending}
                    type="submit"
                    size="sm"
                    colorScheme="blue"
                    {...buttons?.accept?.props}
                  >
                    {buttons?.accept?.label || "Créer"}
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
}

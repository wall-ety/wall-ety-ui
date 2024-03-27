import {
  Button,
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

import { useToast } from "@/ui/hooks";
import { ApiErrorResponse } from "@/gen/client";

type CreateProps<T> = {
  children: React.ReactNode;
  defaultValue: T;
  source: string;
  title: string;
  buttonProps?: {
    label?: string;
  };
  provider: (toSave: T) => Promise<T>;
  transform?: (toSave: T | any) => T | any;
};

export function Create<T>({
  children,
  defaultValue,
  title,
  provider,
  source,
  transform,
  buttonProps,
}: CreateProps<T>) {
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
          title: "Created",
          description: "Your resource have been created with sucess",
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
        isLoading={isPending}
        sx={{ my: 2, px: 7, fontSize: "15px" }}
      >
        {buttonProps?.label || "Create"}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent sx={{ bgColor: modalBgColor }}>
          <Formik
            initialValues={defaultValue as FormikValues}
            onSubmit={(values, actions) => {
              doSubmit(values as T);
              actions.setSubmitting(false);
            }}
          >
            {() => (
              <Form>
                <ModalHeader sx={{ fontSize: "16px" }}>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{children}</ModalBody>
                <ModalFooter>
                  <Button
                    size="sm"
                    colorScheme="red"
                    variant="outline"
                    mr={5}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={isPending}
                    type="submit"
                    size="sm"
                    colorScheme="blue"
                  >
                    Create
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

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from "@chakra-ui/react";
import { Form, Formik, FormikValues } from "formik";

type CreateContentProps<T> = {
  children: React.ReactNode,
  defaultValue: T,
  onSubmit: (toSave: unknown | any) => void,
  onClose: () => void,
  isOpen: boolean,
  isPending: boolean,
  title: string
}

export function CreateContent<T>({
  onSubmit,
  onClose,
  isOpen,
  children,
  title,
  isPending,
  defaultValue
}: CreateContentProps<T>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Formik
          initialValues={defaultValue as FormikValues}
          onSubmit={(values, actions) => {
            onSubmit(values as T)
            actions.resetForm();
            actions.setSubmitting(false);
            onClose();
          }}
        >
          {(props: any) => (
            <Form>
              <ModalHeader sx={{ fontSize: "16px" }}>{title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {children}
              </ModalBody>
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
                <Button isLoading={isPending} type="submit" size="sm" colorScheme="blue">
                  Create
                </Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
}

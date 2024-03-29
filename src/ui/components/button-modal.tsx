import {
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Modal,
  ModalContent,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FlexBox } from "./flex-box";

type ButtonModalProps = {
  button: {
    label: string;
    props?: ButtonProps;
  };
  modalContent?: {
    props?: BoxProps;
  };
  children: React.ReactNode;
};

export function ButtonModal({
  button,
  children,
  modalContent,
  ...boxProps
}: ButtonModalProps) {
  const { isOpen, onToggle } = useDisclosure();
  const modalBgColor = useColorModeValue("white.900", "#434544");

  return (
    <FlexBox sx={{ width: "20%", justifyContent: "end" }} {...boxProps}>
      <Button
        size="sm"
        colorScheme="blue"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {button.label}
      </Button>
      <Modal isOpen={isOpen} onClose={onToggle}>
        <ModalOverlay />
        <ModalContent sx={{ bgColor: modalBgColor }}>
          <Box {...modalContent?.props}>{children}</Box>
        </ModalContent>
      </Modal>
    </FlexBox>
  );
}

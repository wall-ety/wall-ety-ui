import { UseToastOptions, useToast as useToastCore } from "@chakra-ui/react"

export function useToast() {
  const toast = useToastCore()

  const doToast = (options: UseToastOptions) => {
    toast({
      ...options,
      duration: 3000,
      isClosable: true
    });
  }
  return doToast;
}

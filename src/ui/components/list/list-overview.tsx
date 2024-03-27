import { Text, Box } from "@chakra-ui/react"

import { FlexBox } from "../flex-box";

type ListOverviewProps<T> = {
  data: T[],
}

//TODO: show som information 
export function ListOverview<T>({ data }: ListOverviewProps<T>) {
  return (
    <FlexBox sx={{ gap: 3, mb: 2 }} >
      <Box>
        <Text sx={{ fontSize: "1.5rem", fontWeight: 600 }}>
          Overview
        </Text>
        {/* <Text sx={{ fontSize: ".9rem", color: icolor500 }}> */}
        {/*   Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum . */}
        {/* </Text> */}
      </Box>
    </FlexBox>
  )
}

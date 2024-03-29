import Image from "next/image";
import { Text } from "@chakra-ui/react";
import { FlexBox } from "../flex-box";

import emptyImage from "@/assets/images/empy_list.png";

export function ListEmpty() {
  return (
    <FlexBox
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        height: "300px",
      }}
    >
      <Image src={emptyImage.src} width={150} height={150} alt="Empty" />
      <Text sx={{ fontSize: "20px", fontWeight: "bold" }}>Empty List</Text>
    </FlexBox>
  );
}

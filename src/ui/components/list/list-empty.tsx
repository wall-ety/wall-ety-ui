import { Text } from "@chakra-ui/react";
import { FlexBox } from "../flex-box";

export function ListEmpty() {
  return (
    <FlexBox
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        height: "300px",
      }}
    >
      <Text sx={{ fontSize: "20px", fontWeight: "bold" }}>Empty List</Text>
    </FlexBox>
  );
}

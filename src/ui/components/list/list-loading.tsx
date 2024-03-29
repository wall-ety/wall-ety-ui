import { Spinner } from "@chakra-ui/react";
import { FlexBox } from "../flex-box";

export function ListLoading() {
  return (
    <FlexBox
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        height: "300px",
      }}
    >
      <Spinner />
    </FlexBox>
  );
}

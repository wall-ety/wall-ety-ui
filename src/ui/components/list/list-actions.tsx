import { StyleProps } from "@chakra-ui/react";
import { FlexBox } from "../flex-box";

type ListActionsProps = {
  children: React.ReactNode;
  sx?: StyleProps
};
export function ListActions({ children, sx }: ListActionsProps) {
  return (
    <FlexBox
      sx={{
        display: "flex",
        alignItems: "centrer",
        justifyContent: "end",
        width: "25%",
        gap: 4,
        pe: 5,
        ...sx
      }}
    >
      {children}
    </FlexBox>
  );
}

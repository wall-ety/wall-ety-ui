import { FlexBox } from "../flex-box"

type ListActionsProps = {
  children: React.ReactNode
}
export function ListActions({ children }: ListActionsProps) {
  return (
    <FlexBox
      sx={{ display: "flex", alignItems: "centrer", justifyContent: "end", width: "25%", gap: 4, pe: 5 }}
    >
      {children}
    </FlexBox>
  )
}

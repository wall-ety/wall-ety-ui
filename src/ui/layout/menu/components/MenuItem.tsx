import { Button, Text } from "@chakra-ui/react";

type MenuItemProps = {
  label: string;
  icon: React.ReactElement;
};

export function MenuItem({ label, icon }: MenuItemProps) {
  return (
    <Button
      variant="ghost"
      sx={{
        "gap": 3,
        "pl": 7,
        "display": "flex",
        "alignItems": "center",
        "width": "100%",
        "cursor": "pointer",
        "fontWeight": "normal",
        "justifyContent": "start",
        "& .MuiSvgIcon-root": {
          fontSize: "14px",
        },
      }}
    >
      {icon}
      <Text fontSize="14px">{label}</Text>
    </Button>
  );
}

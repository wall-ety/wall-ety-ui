import { Button } from "@chakra-ui/react";

type SingleMenuProps = {
  label: string;
  icon: React.ReactElement;
};

export function SingleMenu({ label, icon }: SingleMenuProps) {
  return (
    <Button
      sx={{
        "pl": 4,
        "gap": 2,
        "w": "100%",
        "display": "flex",
        "alignItems": "center",
        "fontWeight": "normal",
        "cursor": "pointer",
        "justifyContent": "start",
        "fontSize": "14px",
        "& .MuiSvgIcon-root": {
          fontSize: "14px",
        },
      }}
      variant="ghost"
    >
      {icon}
      {label}
    </Button>
  );
}

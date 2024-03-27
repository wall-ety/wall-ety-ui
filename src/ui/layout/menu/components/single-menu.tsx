import { Button } from "@chakra-ui/react";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";

type BaseProps = {
  label: string;
  icon: React.ReactElement;
};

type SingleMenuProps = {
  to?: string;
} & BaseProps;

export function SingleMenuBase({ label, icon }: BaseProps) {
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
        "fontSize": "16px",
        "& .MuiSvgIcon-root": {
          fontSize: "16px",
        },
      }}
      variant="ghost"
    >
      {icon}
      {label}
    </Button>
  );
}

export function SingleMenu(props: SingleMenuProps) {
  return props.to ? (
    <Link href={props.to}>
      <SingleMenuBase {...props} />
    </Link>
  ) : (
    <SingleMenuBase {...props} />
  );
}

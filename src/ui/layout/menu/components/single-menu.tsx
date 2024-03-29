import { usePaletteColor } from "@/ui/hooks";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type BaseProps = {
  label: string;
  icon: React.ReactElement;
  to?: string;
};

type SingleMenuProps = {
  to?: string;
} & BaseProps;

export function SingleMenuBase({ label, icon, to }: BaseProps) {
  const pathName = usePathname();
  const { icolor900 } = usePaletteColor();

  const isActive = pathName.toString() === to;

  return (
    <Button
      sx={{
        "p": 4,
        "gap": 2,
        "my": 1,
        "mx": "auto",
        "w": "250px",
        "display": "flex",
        "bgColor": isActive ? "main" : "transparent",
        "alignItems": "center",
        "borderRadius": "15px",
        "fontWeight": "normal",
        "transition": "all .5s linear",
        "cursor": "pointer",
        "justifyContent": "start",
        "color": isActive ? "white.900" : icolor900,
        "&:hover": {
          color: "white.900",
          bgColor: "main",
        },
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

import { usePaletteColor } from "@/ui/hooks";
import { Button, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

type MenuItemProps = {
  label: string;
  icon: React.ReactElement;
  to: string
};

export function MenuItem({ label, icon, to }: MenuItemProps) {
  const pathName = usePathname();
  const { icolor900 } = usePaletteColor();

  const isActive = pathName.toString() === to;

  return (
    <Button
      variant="ghost"
      sx={{
        px: 10,
        py: 2,
        gap: 2,
        my: 1,
        mx: "auto",
        w: "250px",
        display: "flex",
        bgColor: isActive ? "main" : "transparent",
        alignItems: "center",
        borderRadius: "10px",
        transition: "all .5s linear",
        cursor: "pointer",
        fontWeight: "normal",
        justifyContent: "start",
        color: isActive ? "white.900" : icolor900,
        "&:hover": {
          color: "white.900",
          bgColor: "main"
        },
        fontSize: "14px",
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

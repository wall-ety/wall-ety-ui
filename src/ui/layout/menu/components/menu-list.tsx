import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { usePaletteColor } from "@/ui/hooks";

type MenuListProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactElement;
};

export function MenuList({ label, children, icon }: MenuListProps) {
  const { isOpen, onToggle: toggleListMenu } = useDisclosure();

  return (
    <Box width="100%" my={0.5} aria-checked={isOpen} position="relative">
      <Button
        variant="ghost"
        onClick={toggleListMenu}
        sx={{
          p: 4,
          gap: 2,
          my: 1,
          mx: "auto",
          w: "250px",
          display: "flex",
          alignItems: "center",
          borderRadius: "15px",
          fontWeight: "normal",
          transition: "all .5s linear",
          cursor: "pointer",
          justifyContent: "space-between",
          "&:hover": {
            color: "white.900",
            bgColor: "main"
          },
          fontSize: "16px",
          "& .MuiSvgIcon-root": {
            fontSize: "16px",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          {icon}
          <Text fontWeight="normal" fontSize="16px">
            {label}
          </Text>
        </Box>
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </Button>
      <Collapse animate in={isOpen} animateOpacity>
        <Box width="100%">
          {children}
        </Box>
      </Collapse>
      <Box
        sx={{
          left: 8,
          top: 12,
          width: "2px",
          height: isOpen ? "55%" : 0,
          transition: "all .5s linear",
          bgColor: "main",
          position: "absolute",
        }}
      />
    </Box >
  );
}

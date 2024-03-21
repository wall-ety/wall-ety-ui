import { ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Text, useDisclosure } from "@chakra-ui/react";
import { usePaletteColors } from "@/ui/hooks";

type MenuListProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactElement;
};

export function MenuList({ label, children, icon }: MenuListProps) {
  const { isOpen, onToggle: toggleListMenu } = useDisclosure();
  const { text: textColor } = usePaletteColors();

  return (
    <Box width="100%" sx={{}}>
      <Button
        variant="ghost"
        onClick={toggleListMenu}
        sx={{
          "px": 4,
          "gap": 1,
          "display": "flex",
          "w": "100%",
          "alignItems": "center",
          "cursor": "pointer",
          "justifyContent": "space-between",
          "& .MuiSvgIcon-root": {
            fontSize: "14px",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          {icon}
          <Text fontWeight="normal" color={textColor} fontSize="14px">
            {label}
          </Text>
        </Box>
        <ExpandMore sx={{ color: textColor }} />
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box width="100%">{children}</Box>
      </Collapse>
    </Box>
  );
}

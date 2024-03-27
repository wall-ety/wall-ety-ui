import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button, Collapse, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";

type MenuListProps = {
  label: string;
  children: React.ReactNode;
  icon: React.ReactElement;
};

export function MenuList({ label, children, icon }: MenuListProps) {
  const { isOpen, onToggle: toggleListMenu } = useDisclosure();
  const subMenuColor = useColorModeValue("#ededed", "#424242");

  return (
    <Box width="100%" my={.5} aria-checked={isOpen}>
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
        <Box width="100%" bgColor={subMenuColor}>{children}</Box>
      </Collapse>
    </Box>
  );
}

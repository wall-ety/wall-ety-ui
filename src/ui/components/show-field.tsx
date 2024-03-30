import { Box, Heading, HeadingProps, Text, TextProps } from "@chakra-ui/react";
import { usePaletteColor } from "../hooks";

type ShowFieldProps = {
  label: {
    content: string | number;
    props?: HeadingProps;
  };
  value: {
    content: string | number;
    props?: TextProps;
  };
};
export function ShowField({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  const { secondText } = usePaletteColor();
  return (
    <Box>
      <Heading sx={{ fontWeight: "bold", fontSize: "15px", color: secondText }}>
        {label}
      </Heading>
      <Text sx={{ fontsize: "14px", color: "white.500" }}>{value}</Text>
    </Box>
  );
}

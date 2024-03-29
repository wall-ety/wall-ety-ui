import {
  Box,
  Heading,
  BoxProps,
  HeadingProps,
  useColorModeValue,
} from "@chakra-ui/react";
import { FlexBox } from "./flex-box";
import { usePaletteColor } from "../hooks";

type BoxCardProps = {
  icon: React.ReactElement;
  label: {
    content: string;
    props?: HeadingProps;
  };
  value: {
    content: string | number;
    props?: HeadingProps;
  };
} & BoxProps;

export function BoxCard({ label, icon, value, ...boxProps }: BoxCardProps) {
  const { secondText, icolor500 } = usePaletteColor();
  const bgColor = useColorModeValue("white.900", "#474545");

  return (
    <FlexBox
      sx={{
        "p": 5,
        "borderRadius": "5px",
        "alignItems": "end",
        "minWidth": "200px",
        "& .MuiSvgIcon-root": {
          fontSize: "40px",
        },
        "gap": 5,
        "justifyContent": "space-between",
        bgColor,
      }}
      {...boxProps}
    >
      <Box>
        <Heading
          sx={{ color: secondText, fontSize: "14px", mb: 1 }}
          {...label.props}
        >
          {label.content}
        </Heading>
        <Heading sx={{ color: icolor500, fontSize: "1.5rem" }} {...value.props}>
          {value.content}
        </Heading>
      </Box>
      {icon}
    </FlexBox>
  );
}

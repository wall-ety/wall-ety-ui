"use client";

import {
  Box,
  Button,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TrendingUp, TrendingDown } from "@mui/icons-material";

import { FlexBox } from "@/ui/components";
import { LineChart } from "@/ui/components/chart";
import { usePaletteColor } from "@/ui/hooks";
import { PALETTE_COLORS } from "@/ui/theme";

export default function Home() {
  const bgColor = useColorModeValue("white.900", "black.800");
  const { secondText, primaryText } = usePaletteColor();

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100px",
      }}
    >
      <FlexBox sx={{ gap: 4, alignItems: "stretch", mb: 5 }}>
        <Box sx={{ flex: 1, bgColor: "main", p: 5, rounded: 8 }}>
          <Text fontSize="16px" color="white.900" my={1} fontWeight="bold">
            Welcome Back
          </Text>
          <Text fontSize="14px" color="white.900" my={1}>
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </Text>
          <Button bgColor="white.900" size="sm" color="black.900" my={1}>
            Create Account
          </Button>
        </Box>
        <Box sx={{ flex: 1, bgColor, p: 5, rounded: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Text fontSize="13px" color={secondText}>
                Month salary
              </Text>
              <Text
                fontSize="1rem"
                my={1}
                fontWeight="bold"
                color={{ primaryText }}
              >
                First Account
              </Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="13px" color={secondText}>
                Avalaible Money
              </Text>
              <Text
                fontSize="1rem"
                my={1}
                fontWeight="bold"
                color={{ primaryText }}
              >
                $ 5441.5
              </Text>
            </Box>
          </Box>
          <FlexBox sx={{ mt: 5, gap: 4, width: "100%" }}>
            <FlexBox sx={{ gap: 2 }}>
              <IconButton aria-label="show-stats" bgColor="#f5a4ad">
                <TrendingDown sx={{ color: PALETTE_COLORS.red }} />
              </IconButton>
              <Text fontSize=".9rem" fontWeight="bold">
                $ 90.55454
              </Text>
            </FlexBox>
            <FlexBox sx={{ gap: 2 }}>
              <IconButton aria-label="show-stats" bgColor="#90db8a">
                <TrendingUp sx={{ color: PALETTE_COLORS.green }} />
              </IconButton>
              <Text fontSize=".9rem" fontWeight="bold">
                $ 90.55454
              </Text>
            </FlexBox>
          </FlexBox>
        </Box>
      </FlexBox>
      <LineChart sx={{ width: 500 }} />
    </Box>
  );
}

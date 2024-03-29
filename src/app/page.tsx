"use client";

import {
  Box,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { TrendingUp, TrendingDown } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { FlexBox } from "@/ui/components";
import { usePaletteColor } from "@/ui/hooks";
import { PALETTE_COLORS } from "@/ui/theme";
import { ClientList } from "@/operations/clients/list";
import { CreateClient } from "@/operations/clients/mutation";
import { clientProvider } from "@/providers/client-provider";

export default function Home() {
  const { data: clients } = useQuery({
    queryFn: () => clientProvider.getAll({}),
    queryKey: ["clients"]
  });

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
            Welcome to Wallety
          </Text>
          <Text fontSize="14px" color="white.900" my={1}>
            Introducing Wallety: Your go-to virtual bank for seamless online financial management and learning.
          </Text>
          <CreateClient />
        </Box>
        <Box sx={{ flex: 1, bgColor, p: 5, rounded: 8 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Text fontSize="13px" color={secondText}>
                All of users
              </Text>
              <Text
                fontSize="1rem"
                my={1}
                fontWeight="bold"
                color={{ primaryText }}
              >
                List of Users
              </Text>
            </Box>
            <Box textAlign="end">
              <Text fontSize="13px" color={secondText}>
                Total of Users
              </Text>
              <Text
                fontSize="1rem"
                my={1}
                fontWeight="bold"
                color={{ primaryText }}
              >
                {(clients || []).length}
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
      <ClientList />
    </Box>
  );
}

import { Box } from "@chakra-ui/react";

export type OverviewProps = {
  content: React.ReactNode;
};

export function ListOverview({ content }: OverviewProps) {
  return (
    <Box sx={{ mb: 5 }}>
      {content}
    </Box>
  );
}

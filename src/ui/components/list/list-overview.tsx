import { Text, Box } from "@chakra-ui/react";

export type OverviewProps = {
  content: React.ReactNode;
};

export function ListOverview({ content }: OverviewProps) {
  return (
    <Box sx={{ mb: 5 }}>
      <Text sx={{ fontSize: "1.5rem", fontWeight: 600 }}>Overview</Text>
      {content}
    </Box>
  );
}

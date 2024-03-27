import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { LabelType, ListLabel } from "./list-label";
import { ListOverview, OverviewProps } from "./list-overview";
import { ListContent } from "./list-content";

type ListProps<T> = {
  provider: () => Promise<T[]>,
  labels: LabelType<T>[],
  title: string,
  children?: React.ReactNode,
  overviewProps: OverviewProps<T>,
};

export function List<T>({ provider, labels, overviewProps }: ListProps<T>) {
  const { data } = useQuery({
    queryFn: provider,
    queryKey: [overviewProps.source],
  });

  return (
    <Box sx={{ width: "100%", pl: 3 }}>
      <ListOverview {...overviewProps} />
      <ListLabel labels={labels} />
      <ListContent data={data || []} labels={labels} />
    </Box>
  );
}

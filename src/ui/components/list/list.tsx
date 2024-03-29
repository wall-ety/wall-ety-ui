import { Box } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { LabelType, ListLabel } from "./list-label";
import { ListOverview, OverviewProps } from "./list-overview";
import { ListContent } from "./list-content";

type ListProps<T> = {
  provider: () => Promise<T[]>;
  labels: LabelType<T>[];
  title: string;
  overviewProps: OverviewProps;
  source: string;
  rowClick?: (data: T) => void;
};

export function List<T>({
  provider,
  labels,
  source,
  overviewProps,
  rowClick,
}: ListProps<T>) {
  const { data, isPending } = useQuery({
    queryFn: provider,
    queryKey: [source],
  });

  return (
    <Box sx={{ width: "100%", pl: 3 }}>
      <ListOverview {...overviewProps} />
      <ListLabel labels={labels} />
      <ListContent rowClick={rowClick} isPending={isPending} data={data || []} labels={labels} />
    </Box>
  );
}

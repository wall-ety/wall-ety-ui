import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { LabelType, ListLabel } from "./list-label";
import { ListOverview } from "./list-overview";
import { ListContent } from "./list-content";

type ListProps<T> = {
  provider: () => Promise<T[]>;
  labels: LabelType<T>[];
  title: string;
  children?: React.ReactNode;
};

export function List<T>({ provider, labels }: ListProps<T>) {
  const { data } = useQuery({
    queryFn: provider,
  });

  return (
    <Box sx={{ width: "100%", pl: 3 }}>
      <ListOverview data={data || []} />
      <ListLabel labels={labels} />
      <ListContent data={data || []} labels={labels} />
    </Box>
  );
}

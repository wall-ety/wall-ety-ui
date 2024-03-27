import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import { LabelType } from "./list-label";
import { FlexBox } from "../flex-box";

import { usePaletteColor } from "@/hooks";

function ListItem<T>({ item, labels }: { item: T; labels: LabelType<T>[] }) {
  const { icolor900 } = usePaletteColor();
  const bgColor = useColorModeValue("white.900", "black.800");

  return (
    <FlexBox
      sx={{
        my: 3,
        bgColor: bgColor,
        width: "100%",
        textAlign: "center",
        borderRadius: "5px",
        py: 3,
      }}
    >
      {labels.map((label, index) =>
        !label.component ? (
          <Text
            key={uuid()}
            sx={{
              fontSize: "14px",
              color: icolor900,
              width: labels[index].size || `${100 / labels.length}%`,
            }}
          >
            {item[label.source!] as React.ReactNode}
          </Text>
        ) : (
          <label.component key={uuid()} data={item} />
        )
      )}
    </FlexBox>
  );
}

export function ListContent<T>({
  data,
  labels,
}: {
  data: T[];
  labels: LabelType<T>[];
}) {
  return (
    <Box sx={{ width: "100%" }}>
      {data.map((item) => (
        <ListItem key={uuid()} item={item} labels={labels} />
      ))}
    </Box>
  );
}

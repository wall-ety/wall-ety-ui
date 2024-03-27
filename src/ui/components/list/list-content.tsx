import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import { LabelType } from "./list-label";
import { FlexBox } from "../flex-box";

import { usePaletteColor } from "@/ui/hooks";

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
      {labels.map((label, index) => {
        if (label.component && !label.render) {
          return <label.component data={item} key={uuid()} />;
        }

        return (
          <Text
            key={uuid()}
            sx={{
              fontSize: "14px",
              color: icolor900,
              width: labels[index].size || `${100 / labels.length}%`,
            }}
          >
            {label.render
              ? label.render(item)
              : (item[label.source!] as React.ReactNode)}
          </Text>
        );
      })}
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

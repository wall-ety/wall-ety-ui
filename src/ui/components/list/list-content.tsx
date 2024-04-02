import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";

import { LabelType } from "./list-label";
import { FlexBox } from "../flex-box";

import { ListEmpty } from "./list-empty";
import { ListLoading } from "./list-loading";
import { usePaletteColor } from "@/ui/hooks";
import { getObjValue } from "@/utils/get-obj-value";
import { NOOP_FN } from "@/utils/noop";

type ListItemProps<T> = {
  item: T;
  labels: LabelType<T>[];
  rowClick?: (data: T) => void;
};

function ListItem<T>({ item, labels, rowClick }: ListItemProps<T>) {
  const { icolor900 } = usePaletteColor();
  const bgColor = useColorModeValue("white.900", "black.800");
  const hoverBgColor = useColorModeValue("#cad7ed", "#515152");

  return (
    <FlexBox
      sx={{
        "my": 3,
        "bgColor": bgColor,
        "textAlign": "center",
        "borderRadius": "5px",
        "py": 3,
        "transition": "all .5s linear",
        "&:hover": {
          bgColor: hoverBgColor,
        },
        "cursor": rowClick ? "pointer" : "normal",
      }}
      onClick={() => (rowClick ? rowClick(item) : NOOP_FN())}
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
              : //@ts-ignore
                item[label.source]
                ? //@ts-ignore
                  item[label.source]
                : //@ts-ignore
                  (getObjValue(item, label.source) as React.ReactNode)}
          </Text>
        );
      })}
    </FlexBox>
  );
}

export function ListContent<T>({
  data,
  labels,
  rowClick,
  isPending,
}: {
  data: T[];
  labels: LabelType<T>[];
  rowClick: ListItemProps<T>["rowClick"];
  isPending: boolean;
}) {
  return (
    <Box sx={{ width: "100%" }}>
      {!isPending && data.length === 0 && <ListEmpty />}
      {isPending && <ListLoading />}
      {data.map((item) => (
        <ListItem<T>
          key={uuid()}
          item={item}
          rowClick={rowClick}
          labels={labels}
        />
      ))}
    </Box>
  );
}

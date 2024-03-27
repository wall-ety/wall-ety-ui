import { Text, useColorModeValue } from "@chakra-ui/react";
import { FlexBox } from "../flex-box";

type ItemComponentProps<T> = {
  data: T;
};

export type LabelType<T> = {
  label: string;
  source?: keyof T;
  size?: number | string;
  component?: React.FC<ItemComponentProps<T>>;
};

export function ListLabel<T>({ labels }: { labels: LabelType<T>[] }) {
  const labelColor = useColorModeValue("black.500", "white.500");

  return (
    <FlexBox sx={{ width: "100%", borderRadius: "5px", mb: 3 }}>
      {labels.map((label) => (
        <Text
          key={label.label}
          color={labelColor}
          sx={{
            fontSize: "14px",
            textAlign: "center",
            width: label.size || `${100 / labels.length}%`,
          }}
        >
          {label.label}
        </Text>
      ))}
    </FlexBox>
  );
}

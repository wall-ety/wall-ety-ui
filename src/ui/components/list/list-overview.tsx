import { ChangeEvent } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import { OrderType } from "@/providers/utils";
import { FlexBox } from "../flex-box";
import { OrderValue } from "@/gen/client";
import { usePaletteColor } from "@/ui/hooks";

export type OverviewProps<T> = {
  leftButton: React.ReactNode;
  content?: React.ReactNode;
  orders?: {
    current: OrderType<T>,
    queries: {
      value: keyof T | string,
      label: string
    }[],
    handleChange: (orderValue: OrderType<T>) => void
  }
};

export function ListOverview<T>({ content, leftButton, orders }: OverviewProps<T>) {
  const { color900 } = usePaletteColor();
  return (
    <Box sx={{ mb: 5, px: 0 }}>
      <FlexBox sx={{ justifyContent: "space-between" }}>
        <Box>
          {leftButton}
        </Box>
        {orders && (
          <FlexBox sx={{ gap: 2 }}>
            <Box width="200px">
              <Text style={{ fontSize: "14px" }}>
                Order By:
              </Text>
            </Box>
            <Select
              size="sm"
              py={2}
              bgColor={color900}
              display={"block"}
              placeholder="Order"
              value={orders!.current.orderBy as string}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                orders?.handleChange({ orderBy: e.target.value, order: orders.current.order })
              }}
            >
              {orders?.queries.map((query => {
                return (
                  <option key={query.value as string} value={query.value as string}>
                    {query.label}
                  </option>
                )
              }))}
            </Select>
            <Select
              display={"block"}
              size="sm"
              value={orders!.current.order as string}
              placeholder="Order value"
              colorScheme="green"
              variant="filled"
              onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                orders?.handleChange({ order: e.target.value as OrderValue, orderBy: orders.current.orderBy })
              }}
            >
              <option value={OrderValue.Desc}>
                {OrderValue.Desc}
              </option>
              <option value={OrderValue.Asc}>
                {OrderValue.Asc}
              </option>
            </Select>
          </FlexBox>
        )}
      </FlexBox>
      {content}
    </Box>
  )
}

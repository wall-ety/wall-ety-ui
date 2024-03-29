import { useState } from "react";

import { OrderType } from "@/providers/utils";

export function useOrder<T>(defaultValue: OrderType<T>) {
  const [orderValue, setOrderValue] = useState<OrderType<T>>(defaultValue);

  const handleChange = (newOrderValue: OrderType<T>) => {
    setOrderValue(newOrderValue);
  }

  return { orderValue, handleChange };
}

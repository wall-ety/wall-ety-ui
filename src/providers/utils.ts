import { Configuration, OrderValue } from "@/gen/client";

export function getConfiguration() {
  return new Configuration();
}

export type OrderType<T> = {
  orderBy?: keyof T;
  order?: OrderValue;
};

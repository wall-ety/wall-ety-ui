import { Bank } from "@/gen/client";
import { OrderType } from "./utils";
import { bankApi } from "./api";

export const bankProvider = {
  getAll: async (orderValue: OrderType<Bank>) => {
    return bankApi()
      .getAllBanks(orderValue.order, orderValue.orderBy)
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return bankApi()
      .getBanksById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (banks: Bank[]) => {
    return bankApi()
      .crupdateBanks(banks)
      .then((respone) => respone.data);
  },
};

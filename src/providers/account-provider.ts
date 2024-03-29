import { Account, CreateAccount } from "@/gen/client";
import { OrderType } from "./utils";
import { accountApi } from "./api";

export const accountProvider = {
  getAll: async (orderValue: OrderType<Account>) => {
    return accountApi()
      .getAllAccounts(orderValue.orderBy, orderValue.order)
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return accountApi()
      .getAccountById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (accounts: CreateAccount[]) => {
    return accountApi()
      .crupdateAccounts(accounts)
      .then((respone) => respone.data);
  },
};

import { Account } from "@/gen/client";
import { OrderType } from "./utils";
import { accountApi, balanceApi } from "./api";

export const accountProvider = {
  getAll: async (orderValue: OrderType<Account>, idClient: string | undefined, idBank: string | undefined) => {
    return accountApi()
      .getAllAccounts(orderValue.orderBy, orderValue.order, idClient, idBank)
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return accountApi()
      .getAccountById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (accounts: Account[]) => {
    return accountApi()
      .crupdateAccounts(accounts)
      .then((respone) => respone.data);
  },
  getCurrentBalance: async (accountId: string) => {
    return balanceApi()
      .getCurrentBalance(accountId)
      .then(response => response.data)
  }
};

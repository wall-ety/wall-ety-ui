import {
  Account,
  CreateTransaction,
  CreateTransfer,
  Transaction,
  Transfer,
  TransferDirection,
  TransferStatus,
} from "@/gen/client";
import axios from "axios";
import { OrderType } from "./utils";
import { accountApi, balanceApi, transactionApi, transferApi } from "./api";

export const accountProvider = {
  getAll: async (
    orderValue: OrderType<Account>,
    idClient: string | undefined,
    idBank: string | undefined
  ) => {
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
      .then((response) => response.data);
  },
  getTransaction: async (
    accountId: string,
    orderValue: OrderType<Transaction>
  ) => {
    return transactionApi()
      .getTransactionsByAccountId(
        accountId,
        orderValue.order,
        orderValue.orderBy
      )
      .then((response) => response.data);
  },
  doTransaction: async (transactions: CreateTransaction[]) => {
    return transactionApi()
      .createTransactions(transactions)
      .then((response) => response.data);
  },
  cancelTransfer: async (transferId: string) => {
    return transferApi()
      .cancelById(transferId)
      .then((response) => response.data);
  },
  doTransfers: async (
    externBank: boolean | undefined,
    transfers: CreateTransfer[]
  ) => {
    return transferApi()
      .createTransfers(externBank, transfers)
      .then((response) => response.data);
  },
  getStatements: async (accountId: string, from: string, to: string) => {
    return accountApi()
      .getAccountCategoriesStatements(accountId, from, to)
      .then((response) => response.data);
  },
  getTransfers: async (
    accountId: string,
    direction: TransferDirection | undefined,
    status: TransferStatus | undefined,
    order: OrderType<Transfer>
  ) => {
    return transferApi()
      .getTransfersByAccountId(
        accountId,
        direction,
        status,
        order.order,
        order.orderBy
      )
      .then((response) => response.data);
  },
  getBankStatements: async (accountId: string, from: string, to: string) => {
    return axios
      .get(
        `http://localhost:8080/accounts/${accountId}/statements?from=${new Date(from).toISOString()}&to=${new Date(to).toISOString()}`
      )
      .then((response) => response.data);
  },
  getAny: async (accountId: string, from: string, to: string) => {
    return accountApi()
      .getAccountTransactionsStatements(accountId, from, to)
      .then((response) => response.data);
  },
};

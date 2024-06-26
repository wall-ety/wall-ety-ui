import {
  AccountsApi,
  BalancesApi,
  BanksApi,
  CategoriesApi,
  ClientsApi,
  HealthApi,
  TransactionsApi,
  TransfersApi,
} from "@/gen/client";
import { getConfiguration } from "./utils";

export const healthApi = () => new HealthApi(getConfiguration());
export const clientApi = () => new ClientsApi(getConfiguration());
export const bankApi = () => new BanksApi(getConfiguration());
export const categoryApi = () => new CategoriesApi(getConfiguration());
export const accountApi = () => new AccountsApi(getConfiguration());
export const balanceApi = () => new BalancesApi(getConfiguration());
export const transactionApi = () => new TransactionsApi(getConfiguration());
export const transferApi = () => new TransfersApi(getConfiguration());

import { Client } from "@/gen/client";
import { OrderType } from "./utils";
import { clientApi } from "./api";

export const clientProvider = {
  getAll: async (orderValue: OrderType<Client>) => {
    return clientApi()
      .getAllClients(orderValue.order, orderValue.orderBy)
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return clientApi()
      .getClientById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (clients: Client[]) => {
    return clientApi()
      .crupdateClients(clients)
      .then((respone) => respone.data);
  },
};

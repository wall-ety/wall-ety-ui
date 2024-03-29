import { Client } from "@/gen/client";
import { clientApi } from "./api";

export const clientProvider = {
  getAll: async () => {
    return clientApi()
      .getAllClients()
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

import { Client } from "@/gen/client"
import { clientApi } from "./api"

export const clientProvider = {
  getAll: async () => {
    return clientApi()
      .getAllClients()
      .then(respone => respone.data)
  },
  getById: async (id: string) => {
    return clientApi()
      .getClientById(id)
      .then(respone => respone.data)
  },
  saveOrUpdate: async (client: Client[]) => {
    return clientApi()
      .crupdateClients(client)
      .then(respone => respone.data)
  },
}

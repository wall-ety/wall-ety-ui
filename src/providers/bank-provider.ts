import { Bank } from "@/gen/client";
import { bankApi } from "./api";

export const bankProvider = {
  getAll: async () => {
    return bankApi()
      .getAllBanks()
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return bankApi()
      .getBanksById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (client: Bank[]) => {
    return bankApi()
      .crupdateBanks(client)
      .then((respone) => respone.data);
  },
};

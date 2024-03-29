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
  saveOrUpdate: async (banks: Bank[]) => {
    return bankApi()
      .crupdateBanks(banks)
      .then((respone) => respone.data);
  },
};

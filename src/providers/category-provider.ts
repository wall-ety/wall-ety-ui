import { Category } from "@/gen/client";
import { categoryApi } from "./api";

export const categoryProvider = {
  getAll: async () => {
    return categoryApi()
      .getAllCategories()
      .then((respone) => respone.data);
  },
  getById: async (id: string) => {
    return categoryApi()
      .getCategoryById(id)
      .then((respone) => respone.data);
  },
  saveOrUpdate: async (categories: Category[]) => {
    return categoryApi()
      .crupdateCategories(categories)
      .then((respone) => respone.data);
  },
};

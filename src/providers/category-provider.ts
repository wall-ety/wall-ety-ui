import { Category, CategoryType } from "@/gen/client";
import { OrderType } from "./utils";
import { categoryApi } from "./api";

export const categoryProvider = {
  getAll: async (
    type: CategoryType | undefined,
    orderValue: OrderType<Category>
  ) => {
    return categoryApi()
      .getAllCategories(type, orderValue.order, orderValue.orderBy)
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

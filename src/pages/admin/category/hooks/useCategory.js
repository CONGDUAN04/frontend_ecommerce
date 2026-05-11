import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  fetchAllCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../../../../services/api.category";

const useCategoryCrud = createCrudHook({
  name: "Danh mục",
  apis: {
    getAll: fetchAllCategoriesAPI,
    create: createCategoryAPI,
    update: updateCategoryAPI,
    delete: deleteCategoryAPI,
  },
});

export const useCategory = () => {
  return useCategoryCrud();
};

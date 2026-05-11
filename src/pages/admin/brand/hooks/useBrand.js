import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  fetchAllBrandsAPI,
  createBrandAPI,
  updateBrandAPI,
  deleteBrandAPI,
} from "../../../../services/api.brand";

const useBrandCrud = createCrudHook({
  name: "Thương hiệu",
  apis: {
    getAll: fetchAllBrandsAPI,
    create: createBrandAPI,
    update: updateBrandAPI,
    delete: deleteBrandAPI,
  },
});

export const useBrand = () => {
  return useBrandCrud();
};

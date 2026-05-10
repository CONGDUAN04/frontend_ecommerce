import { createCrudHook } from "../../../../hooks/createCrudHook";

import {
  fetchAllProductColorsAPI,
  fetchProductColorByIdAPI,
  createProductColorAPI,
  updateProductColorAPI,
  deleteProductColorAPI,
} from "../../../../services/api.productColor";

const useProductColorCrud = createCrudHook({
  name: "Màu sản phẩm",

  apis: {
    getAll: fetchAllProductColorsAPI,
    getById: fetchProductColorByIdAPI,
    create: createProductColorAPI,
    update: updateProductColorAPI,
    delete: deleteProductColorAPI,
  },
});

export const useProductColor = () => {
  const crud = useProductColorCrud();

  return {
    ...crud,
  };
};

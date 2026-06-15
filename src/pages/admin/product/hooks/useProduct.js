import { useCallback } from "react";

import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

import {
  fetchAllProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  updateProductStatusAPI,
} from "../../../../services/api.product";

import { createCrudHook } from "../../../../hooks/createCrudHook";

const useProductCrud = createCrudHook({
  name: "Sản phẩm",
  apis: {
    getAll: fetchAllProductsAPI,
    create: createProductAPI,
    update: updateProductAPI,
    delete: deleteProductAPI,
  },
});

export const useProduct = () => {
  const crud = useProductCrud();

  const updateStatus = useCallback(async (id, data) => {
    try {
      const res = await updateProductStatusAPI(id, data);

      handleApiSuccess(res?.message);

      return res;
    } catch (err) {
      handleApiError(err);
    }
  }, []);

  return {
    ...crud,
    updateStatus,
  };
};

import { useContext, useCallback } from "react";
import { NotifyContext } from "../../../../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

import {
  fetchAllProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  updateProductStatusAPI,
} from "../../../../services/api.product";

import { createCrudHook } from "../../../../hooks/createCrudHook";

export const useProduct = () => {
  const crud = createCrudHook({
    name: "Sản phẩm",
    apis: {
      getAll: fetchAllProductsAPI,
      create: createProductAPI,
      update: updateProductAPI,
      delete: deleteProductAPI,
    },
  })();

  const { api } = useContext(NotifyContext);

  const updateStatus = useCallback(
    async (id, data) => {
      try {
        const res = await updateProductStatusAPI(id, data);
        handleApiSuccess(api, res?.message);
        return res;
      } catch (err) {
        handleApiError(api, err);
      }
    },
    [api],
  );

  return {
    ...crud,
    updateStatus,
  };
};

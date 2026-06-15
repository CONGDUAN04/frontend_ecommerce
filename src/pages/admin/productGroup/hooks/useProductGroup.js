import { useCallback } from "react";

import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

import { createCrudHook } from "../../../../hooks/createCrudHook";

import {
  fetchAllProductGroupsAPI,
  createProductGroupAPI,
  updateProductGroupAPI,
  deleteProductGroupAPI,
  updateProductGroupStatusAPI,
} from "../../../../services/api.productGroup";

const useProductGroupCrud = createCrudHook({
  name: "Nhóm sản phẩm",
  apis: {
    getAll: fetchAllProductGroupsAPI,
    create: createProductGroupAPI,
    update: updateProductGroupAPI,
    delete: deleteProductGroupAPI,
  },
});

export const useProductGroup = () => {
  const crud = useProductGroupCrud();

  const updateStatus = useCallback(async (id, data) => {
    try {
      const res = await updateProductGroupStatusAPI(id, data);

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

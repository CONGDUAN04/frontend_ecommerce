import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  fetchAllProductGroupsAPI,
  createProductGroupAPI,
  updateProductGroupAPI,
  deleteProductGroupAPI,
  updateProductGroupStatusAPI,
} from "../../../../services/api.productGroup";

import { useContext, useCallback } from "react";
import { NotifyContext } from "../../../../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

export const useProductGroup = () => {
  const crud = createCrudHook({
    name: "Nhóm sản phẩm",
    apis: {
      getAll: fetchAllProductGroupsAPI,
      create: createProductGroupAPI,
      update: updateProductGroupAPI,
      delete: deleteProductGroupAPI,
    },
  })();

  const { api } = useContext(NotifyContext);

  const updateStatus = useCallback(
    async (id, data) => {
      try {
        const res = await updateProductGroupStatusAPI(id, data);
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

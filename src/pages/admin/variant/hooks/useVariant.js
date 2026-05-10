import { useContext, useCallback } from "react";

import { NotifyContext } from "../../../../contexts/notify.context";

import {
  fetchAllVariantsAPI,
  createVariantAPI,
  updateVariantAPI,
  deleteVariantAPI,
  fetchVariantByIdAPI,
  updateVariantStatusAPI,
} from "../../../../services/api.variant";

import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

import { createCrudHook } from "../../../../hooks/createCrudHook";

const useVariantCrud = createCrudHook({
  name: "Biến thể",

  apis: {
    getAll: fetchAllVariantsAPI,
    getById: fetchVariantByIdAPI,
    create: createVariantAPI,
    update: updateVariantAPI,
    delete: deleteVariantAPI,
  },
});

export const useVariant = () => {
  const crud = useVariantCrud();

  const { api } = useContext(NotifyContext);

  const updateStatus = useCallback(
    async (id, data) => {
      try {
        const res = await updateVariantStatusAPI(id, data);

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

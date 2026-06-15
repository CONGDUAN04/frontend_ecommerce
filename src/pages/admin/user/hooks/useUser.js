import { useCallback } from "react";

import { handleApiSuccess, handleApiError } from "../../../../utils/apiHandler";

import { createCrudHook } from "../../../../hooks/createCrudHook";

import {
  fetchAllUsersAPI,
  createUserAPI,
  updateUserAPI,
  deleteUserAPI,
  updateUserStatusAPI,
} from "../../../../services/api.user";

const useUserCrud = createCrudHook({
  name: "Người dùng",
  apis: {
    getAll: fetchAllUsersAPI,
    create: createUserAPI,
    update: updateUserAPI,
    delete: deleteUserAPI,
  },
});

export const useUser = () => {
  const crud = useUserCrud();

  const updateStatus = useCallback(async (id, data) => {
    try {
      const res = await updateUserStatusAPI(id, data);

      handleApiSuccess(
        res?.message || "Cập nhật trạng thái người dùng thành công",
      );

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

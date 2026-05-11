import { useContext, useCallback } from "react";

import { NotifyContext } from "../../../../contexts/notify.context";

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

  const { api } = useContext(NotifyContext);

  const updateStatus = useCallback(
    async (id, data) => {
      try {
        const res = await updateUserStatusAPI(id, data);

        handleApiSuccess(
          api,
          res?.message || "Cập nhật trạng thái người dùng thành công",
        );

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

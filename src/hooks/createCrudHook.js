import { useContext, useCallback, useMemo } from "react";
import { NotifyContext } from "../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../utils/apiHandler";

export const createCrudHook = ({ name, apis }) => {
  return () => {
    const { api } = useContext(NotifyContext);

    const getAll = async (...params) => {
      try {
        return await apis.getAll(...params);
      } catch (err) {
        handleApiError(api, err);
        throw err;
      }
    };

    const create = useCallback(
      async (data, form) => {
        try {
          const res = await apis.create(data);
          handleApiSuccess(api, res?.message || `Tạo ${name} thành công`);
          return res;
        } catch (err) {
          handleApiError(api, err, form);
        }
      },
      [apis, api, name],
    );

    const update = useCallback(
      async (id, data, form) => {
        try {
          const res = await apis.update(id, data);
          handleApiSuccess(api, res?.message || `Cập nhật ${name} thành công`);
          return res;
        } catch (err) {
          handleApiError(api, err, form);
        }
      },
      [apis, api, name],
    );

    const remove = useCallback(
      async (id) => {
        try {
          const res = await apis.delete(id);
          handleApiSuccess(api, res?.message || `Xóa ${name} thành công`);
          return res;
        } catch (err) {
          handleApiError(api, err);
        }
      },
      [apis, api, name],
    );

    return useMemo(
      () => ({
        getAll,
        create,
        update,
        remove,
      }),
      [getAll, create, update, remove],
    );
  };
};

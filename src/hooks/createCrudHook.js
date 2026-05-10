import { useContext, useCallback, useMemo, useRef } from "react";
import { NotifyContext } from "../contexts/notify.context";
import { handleApiSuccess, handleApiError } from "../utils/apiHandler";

export const createCrudHook = ({ name, apis }) => {
  const apisRef = { current: apis };

  return () => {
    const { api } = useContext(NotifyContext);
    const apiRef = useRef(api);
    apiRef.current = api;

    const getAll = useCallback(async (...params) => {
      try {
        return await apisRef.current.getAll(...params);
      } catch (err) {
        handleApiError(apiRef.current, err);
        throw err;
      }
    }, []);

    const getById = useCallback(async (id) => {
      try {
        return await apisRef.current.getById?.(id);
      } catch (err) {
        handleApiError(apiRef.current, err);
        throw err;
      }
    }, []);

    const create = useCallback(async (data, form) => {
      try {
        const res = await apisRef.current.create(data);
        handleApiSuccess(
          apiRef.current,
          res?.message || `Tạo ${name} thành công`,
        );
        return res;
      } catch (err) {
        handleApiError(apiRef.current, err, form);
      }
    }, []);

    const update = useCallback(async (id, data, form) => {
      try {
        const res = await apisRef.current.update(id, data);
        handleApiSuccess(
          apiRef.current,
          res?.message || `Cập nhật ${name} thành công`,
        );
        return res;
      } catch (err) {
        handleApiError(apiRef.current, err, form);
      }
    }, []);

    const remove = useCallback(async (id) => {
      try {
        const res = await apisRef.current.delete(id);
        handleApiSuccess(
          apiRef.current,
          res?.message || `Xóa ${name} thành công`,
        );
        return res;
      } catch (err) {
        handleApiError(apiRef.current, err);
      }
    }, []);

    return useMemo(
      () => ({
        getAll,
        getById,
        create,
        update,
        remove,
      }),
      [getAll, getById, create, update, remove],
    );
  };
};

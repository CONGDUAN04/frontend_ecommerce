import {
  fetchAllOrdersAPI,
  fetchOrderByIdAPI,
  confirmOrderAPI,
  shipOrderAPI,
  completeOrderAPI,
  cancelOrderAPI,
} from "../../../../services/api.order";

import { handleApiError, handleApiSuccess } from "../../../../utils/apiHandler";

export const useOrder = () => {
  const getAll = async (params) => {
    try {
      return await fetchAllOrdersAPI(params);
    } catch (err) {
      handleApiError(err);
    }
  };

  const getById = async (id) => {
    try {
      return await fetchOrderByIdAPI(id);
    } catch (err) {
      handleApiError(err);
    }
  };

  const confirm = async (id) => {
    try {
      const res = await confirmOrderAPI(id);

      handleApiSuccess("Xác nhận đơn thành công");

      return res;
    } catch (err) {
      handleApiError(err);
    }
  };

  const ship = async (id) => {
    try {
      const res = await shipOrderAPI(id);

      handleApiSuccess("Tạo vận đơn thành công");

      return res;
    } catch (err) {
      handleApiError(err);
    }
  };

  const complete = async (id) => {
    try {
      const res = await completeOrderAPI(id);

      handleApiSuccess("Hoàn tất đơn hàng");

      return res;
    } catch (err) {
      handleApiError(err);
    }
  };

  const cancel = async (id, data, form) => {
    try {
      const res = await cancelOrderAPI(id, data);

      handleApiSuccess("Hủy đơn hàng thành công");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };

  return {
    getAll,
    getById,
    confirm,
    ship,
    complete,
    cancel,
  };
};

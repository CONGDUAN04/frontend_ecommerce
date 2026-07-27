import {
  getReturnRequestsAPI,
  getReturnRequestDetailAPI,
  approveReturnAPI,
  receiveReturnAPI,
  rejectReturnAPI,
  completeReturnAPI,
  inspectingReturnAPI,
} from "../../../../services/client/api.return";

import { handleApiError, handleApiSuccess } from "../../../../utils/apiHandler";

export const useReturn = () => {
  const getAll = async (params) => {
    try {
      return await getReturnRequestsAPI(params);
    } catch (err) {
      handleApiError(err);
    }
  };

  const getById = async (id) => {
    try {
      return await getReturnRequestDetailAPI(id);
    } catch (err) {
      handleApiError(err);
    }
  };

  const approve = async (id, data, form) => {
    try {
      const res = await approveReturnAPI(id, data);

      handleApiSuccess("Duyệt yêu cầu trả hàng thành công");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };

  const receive = async (id, data, form) => {
    try {
      const res = await receiveReturnAPI(id, data);

      handleApiSuccess("Đã xác nhận nhận hàng hoàn");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };

  const reject = async (id, data, form) => {
    try {
      const res = await rejectReturnAPI(id, data);

      handleApiSuccess("Đã từ chối yêu cầu trả hàng");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };

  const complete = async (id, data, form) => {
    try {
      const res = await completeReturnAPI(id, data);

      handleApiSuccess("Hoàn tiền thành công");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };
  const inspecting = async (id, data, form) => {
    try {
      const res = await inspectingReturnAPI(id, data);

      handleApiSuccess("Đã chuyển sang trạng thái kiểm tra sản phẩm");

      return res;
    } catch (err) {
      handleApiError(err, form);
    }
  };
  return {
    getAll,
    getById,
    approve,
    reject,
    complete,
    receive,
    inspecting,
  };
};

import { useMemo, useCallback } from "react";
import { createCrudHook } from "../../../../hooks/createCrudHook";

import {
  createOrderAPI,
  getOrdersAPI,
  getOrderDetailAPI,
  cancelOrderAPI,
  reorderOrderAPI,
  returnOrderAPI,
  getReturnRequestAPI,
} from "../../../../services/client/api.order";

const useOrderCrud = createCrudHook({
  name: "đơn hàng",
  apis: {
    create: createOrderAPI,
    getAll: getOrdersAPI,
    getById: getOrderDetailAPI,
  },
});

export const useOrder = () => {
  const crud = useOrderCrud();

  const cancelOrder = useCallback((id, cancelReason) => {
    return cancelOrderAPI(id, cancelReason);
  }, []);

  const reorderOrder = useCallback((id) => {
    return reorderOrderAPI(id);
  }, []);

  const returnOrder = useCallback((id, data) => {
    return returnOrderAPI(id, data);
  }, []);

  const getReturnRequest = useCallback((id) => {
    return getReturnRequestAPI(id);
  }, []);

  return useMemo(
    () => ({
      // CRUD
      createOrder: crud.create,
      getOrders: crud.getAll,
      getOrderDetail: crud.getById,

      // Business actions
      cancelOrder,
      reorderOrder,
      returnOrder,
      getReturnRequest,
    }),
    [crud, cancelOrder, reorderOrder, returnOrder, getReturnRequest],
  );
};

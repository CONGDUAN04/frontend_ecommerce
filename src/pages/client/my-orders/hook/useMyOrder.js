import { useMemo, useCallback } from "react";
import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  getOrdersAPI,
  getOrderDetailAPI,
  cancelOrderAPI,
  reorderOrderAPI,
} from "../../../../services/client/api.order";

const useOrderCrud = createCrudHook({
  name: "đơn hàng",
  apis: {
    getAll: getOrdersAPI,
    getById: getOrderDetailAPI,
  },
});

export const useMyOrder = () => {
  const crud = useOrderCrud();

  const cancelOrder = useCallback(async (id, cancelReason) => {
    return await cancelOrderAPI(id, cancelReason);
  }, []);
  const reorderOrder = useCallback(async (id) => {
    return await reorderOrderAPI(id);
  }, []);
  return useMemo(
    () => ({
      getOrders: crud.getAll,
      getOrderDetail: crud.getById,
      cancelOrder,
      reorderOrder,
    }),
    [crud, cancelOrder],
  );
};

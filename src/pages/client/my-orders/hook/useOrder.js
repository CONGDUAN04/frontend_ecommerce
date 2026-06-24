import { useMemo, useCallback } from "react";
import { createCrudHook } from "../../../../hooks/createCrudHook";
import {
  getOrdersAPI,
  getOrderDetailAPI,
  cancelOrderAPI,
} from "../../../../services/client/api.order";

const useOrderCrud = createCrudHook({
  name: "đơn hàng",
  apis: {
    getAll: getOrdersAPI,
    getById: getOrderDetailAPI,
  },
});

export const useOrder = () => {
  const crud = useOrderCrud();

  const cancelOrder = useCallback(async (id) => {
    return await cancelOrderAPI(id);
  }, []);

  return useMemo(
    () => ({
      getOrders: crud.getAll,
      getOrderDetail: crud.getById,
      cancelOrder,
    }),
    [crud, cancelOrder],
  );
};

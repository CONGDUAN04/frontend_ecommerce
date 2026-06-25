import { useMemo } from "react";

import { createCrudHook } from "../../../../hooks/createCrudHook";

import { getOrderDetailAPI } from "../../../../services/client/api.order";

const useOrderDetailCrud = createCrudHook({
  name: "chi tiết đơn hàng",
  apis: {
    getById: getOrderDetailAPI,
  },
});

export const useOrderDetail = () => {
  const crud = useOrderDetailCrud();

  return useMemo(
    () => ({
      getOrderDetail: crud.getById,
    }),
    [crud],
  );
};

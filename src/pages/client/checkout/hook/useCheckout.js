import { useMemo } from "react";
import { createCrudHook } from "../../../../hooks/createCrudHook";
import { createOrderAPI } from "../../../../services/client/api.order";

const useCheckoutCrud = createCrudHook({
  name: "đơn hàng",
  apis: {
    create: createOrderAPI,
  },
});

export const useCheckout = () => {
  const crud = useCheckoutCrud();

  return useMemo(
    () => ({
      createOrder: crud.create,
    }),
    [crud],
  );
};

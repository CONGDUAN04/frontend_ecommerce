import { useCallback, useContext, useMemo } from "react";
import { NotifyContext } from "../../../../contexts/notify.context";

import {
  getCartAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  clearCartAPI,
} from "../../../../services/client/api.cart";

import { createCrudHook } from "../../../../hooks/createCrudHook";
import { handleApiError, handleApiSuccess } from "../../../../utils/apiHandler";

const useCartCrud = createCrudHook({
  name: "giỏ hàng",
  apis: {
    getAll: getCartAPI,

    create: addToCartAPI,

    update: (itemId, data) => updateCartItemAPI(itemId, data.quantity),

    delete: removeCartItemAPI,
  },
});

export const useCart = () => {
  const crud = useCartCrud();

  const { api } = useContext(NotifyContext);

  const clearCart = useCallback(async () => {
    try {
      const res = await clearCartAPI();

      handleApiSuccess(api, res?.message);

      return res;
    } catch (err) {
      handleApiError(api, err);
    }
  }, [api]);

  return useMemo(
    () => ({
      getCart: crud.getAll,

      addToCart: crud.create,

      updateQuantity: (itemId, quantity) => crud.update(itemId, { quantity }),

      removeItem: crud.remove,

      clearCart,
    }),
    [crud, clearCart],
  );
};

import { createContext, useCallback, useState } from "react";
import { getCartAPI } from "../services/client/api.cart";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    subtotal: 0,
  });

  const fetchCart = useCallback(async () => {
    const res = await getCartAPI();

    if (res?.data) {
      setCart(res.data);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

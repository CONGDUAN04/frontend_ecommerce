import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCartAPI } from "../services/client/api.cart";
import { AuthContext } from "./auth.context";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    subtotal: 0,
  });

  const fetchCart = useCallback(async () => {
    try {
      const res = await getCartAPI();

      if (res?.data) {
        setCart(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({
        items: [],
        totalItems: 0,
        subtotal: 0,
      });
    }
  }, [user, fetchCart]);

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

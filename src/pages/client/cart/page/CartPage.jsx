/* eslint-disable react-hooks/immutability */
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../hook/useCart";
import { CartContext } from "../../../../contexts/cart.context";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import EmptyCart from "../components/EmptyCart";

import "../../../../styles/client/pages/CartPage.css";

export default function CartPage() {
  const navigate = useNavigate();

  const { updateQuantity, removeItem, clearCart } = useCart();

  const { cart, setCart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    const res = await updateQuantity(item.id, item.quantity + 1);

    if (res?.data) {
      setCart(res.data);
    }
  };

  const handleDecrease = async (item) => {
    if (item.quantity <= 1) return;

    const res = await updateQuantity(item.id, item.quantity - 1);

    if (res?.data) {
      setCart(res.data);
    }
  };

  const handleRemove = async (id) => {
    const res = await removeItem(id);

    if (res?.data) {
      setCart(res.data);
    }
  };

  const handleClearCart = async () => {
    await clearCart();

    setCart({
      items: [],
      subtotal: 0,
      totalItems: 0,
    });
  };

  if (!cart?.items?.length) {
    return (
      <div className="cart-page-wrapper">
        <EmptyCart onBackHome={() => navigate("/")} />
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <h1 className="cart-title">Giỏ hàng của bạn ({cart.totalItems})</h1>

      <div className="cart-container">
        <div className="cart-left">
          {cart.items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onRemove={handleRemove}
            />
          ))}
        </div>

        <aside className="cart-right">
          <CartSummary subtotal={cart.subtotal} onClearCart={handleClearCart} />
        </aside>
      </div>
    </div>
  );
}

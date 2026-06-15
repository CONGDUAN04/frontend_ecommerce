/* eslint-disable react-hooks/immutability */
import { useEffect, useContext } from "react";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

import { useCart } from "../hook/useCart";
import { CartContext } from "../../../../contexts/cart.context";

import "../../../../styles/client/pages/cart.css";

export default function CartPage() {
  const { getCart, updateQuantity, removeItem, clearCart } = useCart();
  const { cart, setCart, fetchCart } = useContext(CartContext);

  useEffect(() => {
    fetchCart();
  }, []);

  const handleIncrease = async (item) => {
    const res = await updateQuantity(item.id, item.quantity + 1);
    if (res?.data) setCart(res.data);
  };

  const handleDecrease = async (item) => {
    if (item.quantity === 1) return;
    const res = await updateQuantity(item.id, item.quantity - 1);
    if (res?.data) setCart(res.data);
  };

  const handleRemove = async (id) => {
    const res = await removeItem(id);
    if (res?.data) setCart(res.data);
  };

  const handleClearCart = async () => {
    await clearCart();
    setCart({ items: [], subtotal: 0, totalItems: 0 });
  };

  if (!cart.items.length) {
    return (
      <div className="cart-page-wrapper">
        <div className="empty-cart-container">
          <ShoppingBag size={80} className="empty-icon" />
          <h2>Giỏ hàng của bạn đang trống</h2>
          <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>
          <button
            className="back-home-btn"
            onClick={() => (window.location.href = "/")}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrapper">
      <h1 className="cart-title">Giỏ hàng của bạn ({cart.totalItems})</h1>

      <div className="cart-container">
        <div className="cart-left">
          {cart.items.map((item) => (
            <div className="cart-item-card" key={item.id}>
              <div className="item-image">
                <img
                  src={item.variant.productColor.image}
                  alt={item.variant.product.name}
                />
              </div>

              <div className="item-details">
                <h3 className="item-name">{item.variant.product.name}</h3>
                <p className="item-variant">
                  {item.variant.productColor?.color?.name} ·{" "}
                  {item.variant.storage}
                </p>
                <div className="item-actions">
                  <div className="quantity-control">
                    <button onClick={() => handleDecrease(item)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrease(item)}>
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    className="remove-btn-text"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 size={16} /> Xóa
                  </button>
                </div>
              </div>

              <div className="item-price">
                {(item.price * item.quantity).toLocaleString()}đ
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-right">
          <div className="summary-card">
            <h2>Tổng đơn hàng</h2>
            <div className="summary-row">
              <span>Tạm tính</span>
              <span>{cart.subtotal.toLocaleString()}đ</span>
            </div>
            <div className="summary-row total">
              <span>Tổng cộng</span>
              <span className="total-price">
                {cart.subtotal.toLocaleString()}đ
              </span>
            </div>
            <button className="checkout-btn">THANH TOÁN</button>
            <button className="clear-cart-btn" onClick={handleClearCart}>
              Xóa toàn bộ giỏ hàng
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

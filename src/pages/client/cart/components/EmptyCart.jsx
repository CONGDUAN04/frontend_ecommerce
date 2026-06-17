import { ShoppingBag } from "lucide-react";

export default function EmptyCart({ onBackHome }) {
  return (
    <div className="empty-cart-container">
      <ShoppingBag size={80} className="empty-icon" />

      <h2>Giỏ hàng của bạn đang trống</h2>

      <p>Hãy khám phá các sản phẩm tuyệt vời của chúng tôi!</p>

      <button className="back-home-btn" onClick={onBackHome}>
        Tiếp tục mua sắm
      </button>
    </div>
  );
}

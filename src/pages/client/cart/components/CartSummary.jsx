export default function CartSummary({ subtotal, onClearCart }) {
  return (
    <div className="summary-card">
      <h2>Tổng đơn hàng</h2>

      <div className="summary-row">
        <span>Tạm tính</span>
        <span>{subtotal.toLocaleString()}đ</span>
      </div>

      <div className="summary-row total">
        <span>Tổng cộng</span>

        <span className="total-price">{subtotal.toLocaleString()}đ</span>
      </div>

      <button className="checkout-btn">THANH TOÁN</button>

      <button className="clear-cart-btn" onClick={onClearCart}>
        Xóa toàn bộ giỏ hàng
      </button>
    </div>
  );
}

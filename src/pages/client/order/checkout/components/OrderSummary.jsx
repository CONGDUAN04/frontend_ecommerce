export default function OrderSummary({ cart, loading, onSubmit }) {
  return (
    <div className="checkout-right">
      <div className="summary-sticky-card">
        <h3 className="summary-title">Đơn hàng của bạn</h3>

        <div className="summary-items-list">
          {cart?.items?.map((item) => (
            <div className="summary-item" key={item.id}>
              <div className="img-wrapper">
                <img
                  src={item.variant.productColor.image}
                  alt={item.variant.product.name}
                />
              </div>

              <div className="item-detail">
                <h4>{item.variant.product.name}</h4>

                <p>
                  {item.variant.productColor.color.name} /{" "}
                  {item.variant.storage}
                </p>

                {/* Dòng số lượng đã được cập nhật */}
                <p className="item-quantity">Số lượng: {item.quantity}</p>
              </div>

              <span className="item-price">
                {(item.price * item.quantity).toLocaleString()}đ
              </span>
            </div>
          ))}
        </div>

        <hr className="summary-divider" />

        <div className="summary-calculator">
          <div className="calc-row">
            <span>Tạm tính</span>
            <span>{cart?.subtotal?.toLocaleString()}đ</span>
          </div>

          <div className="calc-row">
            <span>Phí vận chuyển</span>
            <span className="free-shipping">Miễn phí</span>
          </div>

          <hr className="summary-divider" />

          <div className="calc-row total">
            <span>Tổng cộng</span>

            <span className="total-price">
              {cart?.subtotal?.toLocaleString()}đ
            </span>
          </div>
        </div>

        <button
          className={`checkout-submit-btn ${loading ? "loading" : ""}`}
          disabled={loading}
          onClick={onSubmit}
        >
          {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT HÀNG"}
        </button>
      </div>
    </div>
  );
}

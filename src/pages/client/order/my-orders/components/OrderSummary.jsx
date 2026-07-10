import PaymentMethod from "./PaymentMethod";
import PaymentStatus from "./PaymentStatus";

export default function OrderSummary({ order }) {
  return (
    <div className="order-card-summary">
      <div className="summary-left">
        <div className="summary-row">
          <span className="summary-label">Sản phẩm:</span>

          <span className="summary-value">
            {order._count.orderItems} sản phẩm
          </span>
        </div>

        <div className="summary-row">
          <span className="summary-label">Thanh toán:</span>

          <PaymentMethod paymentMethod={order.paymentMethod} />
        </div>

        <div className="summary-row">
          <span className="summary-label">Trạng thái tiền:</span>

          <PaymentStatus status={order.paymentStatus} />
        </div>
      </div>

      <div className="summary-right">
        <div className="price-label">Thành tiền</div>

        <div className="price">{order.finalPrice.toLocaleString("vi-VN")}đ</div>
      </div>
    </div>
  );
}

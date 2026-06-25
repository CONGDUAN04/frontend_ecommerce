import { Card } from "antd";

export default function OrderSummary({ order }) {
  return (
    <Card title="Thanh toán" className="detail-card">
      <div className="summary-row">
        <span>Tạm tính</span>

        <span>{order.subtotal?.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="summary-row">
        <span>Giảm giá</span>

        <span>-{order.discountAmount?.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="summary-row">
        <span>Phí vận chuyển</span>

        <span>{order.shippingFee?.toLocaleString("vi-VN")}₫</span>
      </div>

      <div className="summary-row total-row">
        <span>Tổng thanh toán</span>

        <span>{order.finalPrice?.toLocaleString("vi-VN")}₫</span>
      </div>
    </Card>
  );
}

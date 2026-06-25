import { Card, Tag } from "antd";
import {
  statusMap,
  paymentStatusMap,
  paymentMethodMap,
  getStatusColor,
  getPaymentStatusColor,
} from "../../../../constants/order";

export default function OrderInfo({ order }) {
  return (
    <Card title="Thông tin đơn hàng" className="detail-card">
      <div className="order-info-grid">
        <div>
          <span>Mã đơn hàng</span>
          <strong>{order.orderCode}</strong>
        </div>
        <div>
          <span>Ngày đặt</span>
          <strong>{new Date(order.createdAt).toLocaleString("vi-VN")}</strong>
        </div>
        <div>
          <span>Phương thức thanh toán</span>
          <strong>
            {paymentMethodMap[order.paymentMethod] || order.paymentMethod}
          </strong>
        </div>
        <div>
          <span>Trạng thái đơn hàng</span>
          <Tag
            color={getStatusColor(order.status)}
            className="order-status-tag"
          >
            {statusMap[order.status] || order.status}
          </Tag>
        </div>
        <div>
          <span>Trạng thái thanh toán</span>
          <Tag
            color={getPaymentStatusColor(order.paymentStatus)}
            className="order-status-tag"
          >
            {paymentStatusMap[order.paymentStatus] || order.paymentStatus}
          </Tag>
        </div>
      </div>
    </Card>
  );
}

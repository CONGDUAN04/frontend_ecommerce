import { Card } from "antd";

export default function ShippingInfo({ order }) {
  return (
    <Card title="Thông tin nhận hàng" className="detail-card">
      <div className="shipping-info">
        <p>
          <strong>Người nhận:</strong> {order.receiverName}
        </p>

        <p>
          <strong>Số điện thoại:</strong> {order.receiverPhone}
        </p>

        <p>
          <strong>Địa chỉ:</strong> {order.receiverAddress}
        </p>

        {order.note && (
          <p>
            <strong>Ghi chú:</strong> {order.note}
          </p>
        )}
      </div>
    </Card>
  );
}

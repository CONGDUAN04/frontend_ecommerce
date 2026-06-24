import { Button } from "antd";

export default function OrderActions({ order, onCancel, onView }) {
  return (
    <div className="order-card-footer">
      {(order.status === "PENDING" || order.status === "CONFIRMED") && (
        <Button danger onClick={() => onCancel(order.id)}>
          Hủy đơn
        </Button>
      )}

      <Button type="primary" onClick={onView}>
        Xem chi tiết
      </Button>
    </div>
  );
}

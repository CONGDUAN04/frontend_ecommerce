import { Button } from "antd";

export default function OrderActions({ order, onCancel, onView, onReorder }) {
  const isCancelable =
    order.status === "PENDING" || order.status === "CONFIRMED";

  const isCancelled = order.status === "CANCELLED";

  return (
    <div className="order-card-footer">
      {isCancelable && (
        <Button
          danger
          type="primary"
          className="order-action-btn"
          onClick={() => onCancel(order.id)}
        >
          Hủy đơn
        </Button>
      )}

      {isCancelled && (
        <Button
          type="primary"
          className="order-action-btn"
          onClick={() => onReorder(order.id)}
        >
          Mua lại
        </Button>
      )}

      <Button type="default" className="order-action-btn" onClick={onView}>
        Xem chi tiết
      </Button>
    </div>
  );
}

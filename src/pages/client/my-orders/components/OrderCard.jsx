import { useNavigate } from "react-router-dom";

import OrderHeader from "./OrderHeader";
import OrderItemPreview from "./OrderItemPreview";
import OrderSummary from "./OrderSummary";
import OrderActions from "./OrderActions";

import "../../../../styles/client/sections/my-orders/OrderCard.css";

export default function OrderCard({ order, onCancel, onReorder }) {
  const navigate = useNavigate();

  const firstItem = order.orderItems?.[0];

  const goDetail = () => navigate(`/my-orders/${order.id}`);

  return (
    <div className="order-card">
      <OrderHeader
        orderCode={order.orderCode}
        createdAt={order.createdAt}
        status={order.status}
      />

      <OrderItemPreview
        item={firstItem}
        totalItems={order._count.orderItems}
        onClick={goDetail}
      />

      <OrderSummary order={order} />

      <OrderActions
        order={order}
        onCancel={onCancel}
        onView={goDetail}
        onReorder={onReorder}
      />
    </div>
  );
}

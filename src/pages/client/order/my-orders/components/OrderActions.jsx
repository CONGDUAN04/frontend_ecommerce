import BaseOrderActions from "../../../../../components/ui/BaseOrderActions";

export default function OrderActions({
  order,
  onCancel,
  onView,
  onReorder,
  onReturn,
}) {
  const actions = [];

  if (["PENDING", "CONFIRMED"].includes(order.status)) {
    actions.push({
      key: "cancel",
      label: "Hủy đơn",
      variant: "danger",
      onClick: () => onCancel(order.id),
    });
  }

  if (order.status === "CANCELLED") {
    actions.push({
      key: "reorder",
      label: "Mua lại",
      variant: "danger",
      onClick: () => onReorder(order.id),
    });
  }

  if (order.status === "COMPLETED" && !order.returnRequest) {
    actions.push({
      key: "return",
      label: "Yêu cầu trả hàng",
      variant: "warning",
      onClick: () => onReturn(order.id),
    });
  }

  if (order.returnRequest) {
    actions.push({
      key: "detail",
      label: "Theo dõi trả hàng",
      variant: "warning",
      onClick: () => onView(order.id),
    });
  }

  actions.push({
    key: "detail",
    label: "Xem chi tiết",
    variant: "ghost",
    onClick: () => onView(order.id),
  });

  return <BaseOrderActions actions={actions} layout="horizontal" />;
}

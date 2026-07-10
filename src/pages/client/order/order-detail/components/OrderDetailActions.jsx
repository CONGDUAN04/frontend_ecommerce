import BaseOrderActions from "../../../../../components/ui/BaseOrderActions";

export default function OrderDetailActions({
  order,
  onCancel,
  onReorder,
  onReturn,
  onViewDetail,
}) {
  const actions = [];

  if (["PENDING", "CONFIRMED"].includes(order.status)) {
    actions.push({
      key: "cancel",
      label: "Hủy đơn hàng",
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

  return <BaseOrderActions actions={actions} layout="vertical" />;
}

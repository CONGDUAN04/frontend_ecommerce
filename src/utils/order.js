// utils/order.utils.js
import { Modal } from "antd";

export const confirmCancelOrder = (onConfirm) => {
  Modal.confirm({
    title: "Xác nhận hủy đơn hàng",
    content: "Bạn có chắc chắn muốn hủy đơn hàng này không?",
    okText: "Hủy đơn",
    cancelText: "Đóng",
    okButtonProps: {
      danger: true,
    },
    onOk: onConfirm,
  });
};

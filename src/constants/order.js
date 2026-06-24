export const statusMap = {
  PENDING: "Chờ xác nhận",
  CONFIRMED: "Đã xác nhận",
  SHIPPING: "Đang giao hàng",
  COMPLETED: "Hoàn thành",
  CANCELLED: "Đã hủy",
  RETURN_REQUESTED: "Yêu cầu trả hàng",
  RETURN_APPROVED: "Đã duyệt trả hàng",
  RETURNED: "Đã trả hàng",
};

export const paymentStatusMap = {
  PENDING: "Chờ thanh toán",
  SUCCESS: "Đã thanh toán",
  FAILED: "Thất bại",
  REFUNDED: "Đã hoàn tiền",
};

export const paymentMethodMap = {
  COD: "Thanh toán khi nhận hàng",
  VNPAY: "Ví VNPay",
  MOMO: "Ví MoMo",
  PAYPAL: "Cổng PayPal",
  BANKING: "Chuyển khoản",
};

export const paymentIconMap = {
  COD: "https://cdn-icons-png.flaticon.com/512/6491/6491490.png",
  MOMO: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Logo_MoMo.svg/512px-Logo_MoMo.svg.png",
  PAYPAL: "https://cdn-icons-png.flaticon.com/512/174/174861.png",
  BANKING: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
};

export const getStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "orange";
    case "CONFIRMED":
      return "blue";
    case "SHIPPING":
      return "purple";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
};

export const getPaymentStatusColor = (status) => {
  switch (status) {
    case "PENDING":
      return "var(--color-warning)";
    case "SUCCESS":
      return "var(--color-success)";
    case "FAILED":
      return "var(--color-danger)";
    case "REFUNDED":
      return "var(--blue-color)";
    default:
      return "var(--text-slate)";
  }
};

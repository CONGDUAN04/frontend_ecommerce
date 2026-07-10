/* eslint-disable no-undef */
import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";

export default function SuccessCard({ orderData }) {
  if (!orderData) return null;

  const { orderCode, finalPrice, paymentMethod } = orderData;

  const getPaymentMethodText = (method) => {
    const methods = {
      COD: "Thanh toán khi nhận hàng (COD)",
      VNPAY: "Ví điện tử VNPAY",
      MOMO: "Ví điện tử MoMo",
      BANKING: "Chuyển khoản ngân hàng",
    };

    return methods[method] || method;
  };

  return (
    <div className="success-card">
      <div className="success-icon-wrapper">
        <CheckCircleFilled className="success-icon" />
      </div>

      <h1 className="success-title">Đặt hàng thành công!</h1>

      <p className="success-desc">
        Cảm ơn bạn đã mua sắm tại cửa hàng. Đơn hàng của bạn đã được ghi nhận và
        đang được hệ thống xử lý tự động.
      </p>

      <div className="order-details-box">
        <div className="detail-item">
          <span className="detail-label">Mã đơn hàng:</span>

          <div className="detail-value order-code">{orderCode}</div>
        </div>

        <div className="detail-item">
          <span className="detail-label">Tổng thanh toán:</span>

          <span className="detail-value order-price">
            {finalPrice?.toLocaleString("vi-VN")}đ
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Phương thức:</span>

          <span className="detail-value">
            {getPaymentMethodText(paymentMethod)}
          </span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Trạng thái đơn:</span>

          <span className="status-badge">Chờ xác nhận</span>
        </div>
      </div>
    </div>
  );
}

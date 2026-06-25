import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spin, Form, Button, message, Row, Col } from "antd";

import CancelOrderModal from "../../my-orders/components/CancelOrderModal";

import { useMyOrder } from "../../my-orders/hook/useMyOrder";
import { useOrderDetail } from "../hook/useOrderDetail";

import OrderInfo from "../components/OrderInfo";
import ShippingInfo from "../components/ShippingInfo";
import OrderItems from "../components/OrderItems";
import OrderSummary from "../components/OrderSummary";

import "../../../../styles/client/pages/OrderDetailPage.css";

export default function OrderDetailPage() {
  const { id } = useParams();

  const { getOrderDetail } = useOrderDetail();
  const { cancelOrder } = useMyOrder();

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const res = await getOrderDetail(id);
      if (res?.data) {
        setOrder(res.data);
      }
    } catch {
      message.error("Không thể tải chi tiết đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const handleConfirmCancel = async () => {
    try {
      setCancelLoading(true);
      const values = await form.validateFields();
      const finalReason =
        values.cancelReason === "Khác"
          ? values.customReason
          : values.cancelReason;

      await cancelOrder(order.id, finalReason);
      message.success("Hủy đơn hàng thành công");
      setCancelModalOpen(false);
      form.resetFields();
      await fetchDetail();
    } catch (err) {
      if (err?.error?.errors) {
        const fields = err.error.errors.map((e) => ({
          name: e.field,
          errors: [e.message],
        }));
        form.setFields(fields);
      } else {
        message.error("Không thể hủy đơn hàng");
      }
    } finally {
      setCancelLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="order-detail-loading">
        <Spin size="large" />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="order-detail-page">
      <div className="order-detail-header">
        <h1 className="page-title">Chi tiết đơn hàng #{order.orderCode}</h1>
      </div>

      {/* Thông tin chung của đơn hàng */}
      <OrderInfo order={order} />

      {/* Layout 2 cột cân bằng khoảng cách giữa danh sách hàng và sidebar thanh toán */}
      <Row gutter={[24, 24]} className="order-detail-layout-grid">
        {/* Cột trái: Sản phẩm */}
        <Col xs={24} xl={16} className="layout-col-main">
          <OrderItems items={order.orderItems} />
        </Col>

        {/* Cột phải: Nhận nhận hàng + Tổng tiền tích hợp nút Hủy */}
        <Col xs={24} xl={8} className="layout-col-sidebar">
          <div className="sidebar-sticky-box">
            {/* Thông tin nhận hàng */}
            <ShippingInfo order={order} />

            {/* Khối hóa đơn tích hợp nút hủy */}
            <div className="checkout-summary-integration">
              <OrderSummary order={order} />

              {(order.status === "PENDING" || order.status === "CONFIRMED") && (
                <div className="integrated-action-zone">
                  <Button
                    danger
                    size="large"
                    block
                    className="btn-cancel-sidebar-submit"
                    onClick={() => {
                      form.resetFields();
                      setCancelModalOpen(true);
                    }}
                  >
                    Hủy đơn hàng
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>

      <CancelOrderModal
        open={cancelModalOpen}
        form={form}
        loading={cancelLoading}
        onCancel={() => {
          form.resetFields();
          setCancelModalOpen(false);
        }}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}

import { useEffect, useState, useContext, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Spin, Form, Row, Col } from "antd";
import CancelOrderModal from "../../my-orders/components/CancelOrderModal";
import { useOrder } from "../../hooks/useOrder";
import OrderInfo from "../components/OrderInfo";
import ShippingInfo from "../components/ShippingInfo";
import OrderItems from "../components/OrderItems";
import OrderSummary from "../components/OrderSummary";
import OrderTimeline from "../../../../../components/common/order/OrderTimeline";
import OrderDetailActions from "../components/OrderDetailActions";
import ReturnRequestModal from "../components/ReturnRequestModal";
import { CartContext } from "../../../../../contexts/cart.context";
import {
  handleApiSuccess,
  handleApiError,
} from "../../../../../utils/apiHandler.js";
import { errorToast } from "../../../../../components/ui/toast.jsx";
import "../../../../../styles/client/pages/OrderDetailPage.css";

export default function OrderDetailPage() {
  const { id } = useParams();
  const { getOrderDetail, cancelOrder, reorderOrder, returnOrder } = useOrder();
  const { fetchCart } = useContext(CartContext);

  const [cancelForm] = Form.useForm();
  const [returnForm] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);

  // Cancel
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  // Return
  const [returnOpen, setReturnOpen] = useState(false);
  const [returnLoading, setReturnLoading] = useState(false);

  const fetchDetail = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getOrderDetail(id);

      if (res?.data) {
        setOrder(res.data);
      }
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, [id, getOrderDetail]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleConfirmCancel = async () => {
    try {
      setCancelLoading(true);
      const values = await cancelForm.validateFields();
      const finalReason =
        values.cancelReason === "Khác"
          ? values.customReason
          : values.cancelReason;

      await cancelOrder(order.id, finalReason);
      handleApiSuccess("Hủy đơn hàng thành công");
      setCancelModalOpen(false);
      cancelForm.resetFields();
      await fetchDetail();
    } catch (err) {
      handleApiError(err, cancelForm);
    } finally {
      setCancelLoading(false);
    }
  };

  const handleReorder = async () => {
    try {
      setLoading(true);
      await reorderOrder(order.id);
      await fetchCart();
      handleApiSuccess("Đã thêm lại sản phẩm vào giỏ hàng");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenReturn = () => {
    if (!order) return;
    setReturnOpen(true);
  };

  const handleConfirmReturn = async (payload) => {
    try {
      setReturnLoading(true);
      await returnOrder(order.id, payload);
      handleApiSuccess("Đã gửi yêu cầu trả hàng");

      returnForm.resetFields();
      setReturnOpen(false);

      await fetchDetail();
    } catch (err) {
      handleApiError(err, returnForm);
    } finally {
      setReturnLoading(false);
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
        <h1 className="page-title">Chi tiết đơn hàng - {order.orderCode}</h1>
      </div>

      <div className="order-timeline-wrapper" style={{ marginBottom: 5 }}>
        <OrderTimeline order={order} />
      </div>

      <OrderInfo order={order} />

      <Row
        gutter={[24, 24]}
        className="order-detail-layout-grid"
        style={{ marginTop: 5 }}
      >
        <Col xs={24} xl={16} className="layout-col-main">
          <OrderItems items={order.orderItems} />
        </Col>

        <Col xs={24} xl={8} className="layout-col-sidebar">
          <div className="sidebar-sticky-box">
            <ShippingInfo order={order} />

            <div className="checkout-summary-integration">
              <OrderSummary order={order} />

              <div className="integrated-action-zone">
                <OrderDetailActions
                  order={order}
                  onCancel={() => {
                    cancelForm.resetFields();
                    setCancelModalOpen(true);
                  }}
                  onReorder={handleReorder}
                  onReturn={handleOpenReturn}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      <CancelOrderModal
        open={cancelModalOpen}
        form={cancelForm}
        loading={cancelLoading}
        onCancel={() => {
          cancelForm.resetFields();
          setCancelModalOpen(false);
        }}
        onConfirm={handleConfirmCancel}
      />
      <ReturnRequestModal
        open={returnOpen}
        form={returnForm}
        order={order}
        loading={returnLoading}
        onCancel={() => {
          returnForm.resetFields();
          setReturnOpen(false);
        }}
        onConfirm={handleConfirmReturn}
      />
    </div>
  );
}

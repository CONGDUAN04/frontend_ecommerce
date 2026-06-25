import { useEffect, useState, useContext } from "react";
import { Spin, Pagination, message, Form } from "antd";

import { useMyOrder } from "../hook/useMyOrder";
import { usePagination } from "../../../../hooks/usePagination";

import OrderCard from "../components/OrderCard";
import EmptyOrder from "../components/EmptyOrder";
import CancelOrderModal from "../components/CancelOrderModal";

import { CartContext } from "../../../../contexts/cart.context";

import "../../../../styles/client/pages/MyOrdersPage.css";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { current, pageSize, updatePagination } = usePagination();
  const { getOrders, cancelOrder, reorderOrder } = useMyOrder();
  const { fetchCart } = useContext(CartContext);

  const [form] = Form.useForm();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  // ===== LOAD ORDERS =====
  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders(current, pageSize);

      if (res?.data) {
        setOrders(res.data);
        setTotal(res.meta?.total || 0);
      }
    } catch {
      message.error("Không thể tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;
    loadOrders();
  }, [current, pageSize]);

  // ===== OPEN CANCEL =====
  const handleOpenCancelModal = (id) => {
    setSelectedOrderId(id);
    form.resetFields();
    setCancelModalOpen(true);
  };

  // ===== CONFIRM CANCEL =====
  const handleConfirmCancel = async () => {
    try {
      setCancelLoading(true);

      const values = await form.validateFields();

      const finalReason =
        values.cancelReason === "Khác"
          ? values.customReason
          : values.cancelReason;

      await cancelOrder(selectedOrderId, finalReason);

      message.success("Hủy đơn hàng thành công");

      setCancelModalOpen(false);
      await loadOrders();
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

  // ===== REORDER =====
  const handleReorder = async (orderId) => {
    try {
      setLoading(true);

      await reorderOrder(orderId);

      await fetchCart();

      message.success("Đã thêm lại sản phẩm vào giỏ hàng");
    } catch {
      message.error("Không thể mua lại");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="my-orders-loading">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="my-orders-page">
      <h1 className="page-title">Đơn hàng của tôi</h1>

      <Spin spinning={loading}>
        {orders.length === 0 ? (
          <EmptyOrder />
        ) : (
          <>
            <div className="orders-list">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onCancel={handleOpenCancelModal}
                  onReorder={handleReorder}
                />
              ))}
            </div>

            <Pagination
              current={current}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              showTotal={(t) => `Tổng ${t} đơn hàng`}
              onChange={updatePagination}
            />
          </>
        )}
      </Spin>

      {/* MODAL */}
      <CancelOrderModal
        open={cancelModalOpen}
        form={form}
        loading={cancelLoading}
        onCancel={() => setCancelModalOpen(false)}
        onConfirm={handleConfirmCancel}
      />
    </div>
  );
}

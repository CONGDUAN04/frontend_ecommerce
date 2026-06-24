import { useEffect, useState } from "react";
import { Spin, Pagination } from "antd";

import { useOrder } from "../hook/useOrder";
import { usePagination } from "../../../../hooks/usePagination";

import OrderCard from "../components/OrderCard";
import EmptyOrder from "../components/EmptyOrder";

import "../../../../styles/client/pages/MyOrdersPage.css";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const { current, pageSize, updatePagination } = usePagination();
  const { getOrders, cancelOrder } = useOrder();

  const loadOrders = async () => {
    try {
      setLoading(true);

      const res = await getOrders(current, pageSize);

      if (res?.data) {
        setOrders(res.data);
        setTotal(res.meta.total);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!current || !pageSize) return;

    loadOrders();
  }, [current, pageSize]);

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
                  onCancel={async (id) => {
                    await cancelOrder(id);
                    await loadOrders();
                  }}
                />
              ))}
            </div>

            <div className="pagination-wrapper">
              <Pagination
                current={current}
                pageSize={pageSize}
                total={total}
                showSizeChanger
                showTotal={(total) => `Tổng ${total} đơn hàng`}
                onChange={updatePagination}
              />
            </div>
          </>
        )}
      </Spin>
    </div>
  );
}

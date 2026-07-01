import { useEffect, useState } from "react";

import { usePagination } from "../../../hooks/usePagination";

import { useOrder } from "./hooks/useOrder";

import OrderTable from "./components/order.table";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);

  const [total, setTotal] = useState(0);

  const { current, pageSize, updatePagination } = usePagination();

  const { getAll } = useOrder();

  const loadOrders = async () => {
    const res = await getAll({
      page: current,
      limit: pageSize,
    });

    if (res?.data) {
      setOrders(res.data);
      setTotal(res.meta.total);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [current, pageSize]);

  return (
    <OrderTable
      orders={orders}
      total={total}
      current={current}
      pageSize={pageSize}
      updatePagination={updatePagination}
      loadOrders={loadOrders}
    />
  );
}

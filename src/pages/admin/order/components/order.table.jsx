import { useState } from "react";
import { Button, Dropdown, Tag, Typography } from "antd";
import {
  EyeOutlined,
  CheckCircleOutlined,
  CarOutlined,
  CheckOutlined,
  DownOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import BaseTable from "../../../../components/common/admin/BaseTable.jsx";
import { renderIndex } from "../../../../components/common/admin/tableColumns.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";
import { useOrder } from "../hooks/useOrder.js";
import { statusMap, getStatusColor } from "../../../../constants/order.js";
import OrderDetail from "./OrderDetailModal.jsx";
import ConfirmActionModal from "./ConfirmActionModal.jsx";
import CancelOrderModal from "./CancelOrderModal.jsx";
const { Text } = Typography;

export default function OrderTable({
  orders,
  current,
  pageSize,
  total,
  updatePagination,
  loadOrders,
}) {
  const [loading, setLoading] = useState(false);

  // Detail
  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const [openShip, setOpenShip] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { confirm, getById, ship, complete, cancel } = useOrder();

  const handleConfirm = async (id) => {
    setLoading(true);

    const res = await confirm(id);

    if (res) {
      await loadOrders();
    }

    setLoading(false);
  };
  const handleOpenShip = (id) => {
    setSelectedOrderId(id);
    setOpenShip(true);
  };
  const handleShip = async () => {
    setLoading(true);

    const res = await ship(selectedOrderId);

    if (res) {
      setOpenShip(false);
      setSelectedOrderId(null);
      await loadOrders();
    }

    setLoading(false);
    return !!res;
  };
  const handleViewDetail = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setOpenDetail(true);
    }

    setLoading(false);
  };
  const handleOpenComplete = (id) => {
    setSelectedOrderId(id);
    setOpenComplete(true);
  };

  const handleOpenCancel = (id) => {
    setSelectedOrderId(id);
    setOpenCancel(true);
  };
  const handleCancel = async (values) => {
    setLoading(true);

    const res = await cancel(selectedOrderId, values);

    if (res) {
      setSelectedOrderId(null);
      await loadOrders();
    }

    setLoading(false);

    return !!res;
  };
  const handleComplete = async () => {
    setLoading(true);

    const res = await complete(selectedOrderId);

    if (res) {
      setOpenComplete(false);
      setSelectedOrderId(null);
      await loadOrders();
    }

    setLoading(false);

    return !!res;
  };

  const columns = [
    renderIndex(current, pageSize),

    {
      title: "Mã đơn",
      dataIndex: "orderCode",
      width: 150,
      align: "center",
      render: (text) => (
        <Text strong style={{ color: "#1677ff" }}>
          {text}
        </Text>
      ),
    },

    {
      title: "Khách hàng",
      dataIndex: "receiverName",
      width: 180,
      align: "center",
    },

    {
      title: "Tổng tiền",
      dataIndex: "finalPrice",
      width: 150,
      align: "center",
      render: (value) => (
        <Text strong style={{ color: "#389e0d" }}>
          {Number(value).toLocaleString("vi-VN")}đ
        </Text>
      ),
    },

    {
      title: "Thanh toán",
      dataIndex: "paymentMethod",
      width: 130,
      align: "center",
      render: (method) => {
        const paymentStyles = {
          COD: {
            color: "default",
            label: "COD",
          },
          BANKING: {
            color: "blue",
            label: "CK",
          },
          MOMO: {
            color: "magenta",
            label: "MoMo",
          },
          VNPAY: {
            color: "cyan",
            label: "VNPay",
          },
          PAYPAL: {
            color: "gold",
            label: "PayPal",
          },
        };

        const style = paymentStyles[method] || {
          color: "default",
          label: method,
        };

        return (
          <Tag
            color={style.color}
            style={{
              borderRadius: 12,
              padding: "0 8px",
              border: "none",
              fontWeight: 500,
            }}
          >
            {style.label}
          </Tag>
        );
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 160,
      align: "center",
      render: (status) => (
        <Tag
          color={getStatusColor(status)}
          style={{
            borderRadius: 12,
            padding: "0 10px",
            fontWeight: 500,
          }}
        >
          {statusMap[status]}
        </Tag>
      ),
    },

    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 170,
      align: "center",
      render: (value) => <Text type="secondary">{formatDateTime(value)}</Text>,
    },

    {
      title: "Thao tác",
      width: 150,
      align: "center",
      fixed: "right",
      render: (_, record) => {
        const items = [
          {
            key: "detail",
            icon: <EyeOutlined style={{ color: "#1677ff" }} />,
            label: "Xem chi tiết",
            onClick: () => handleViewDetail(record.id),
          },
        ];

        if (record.status === "PENDING") {
          items.push({
            key: "confirm",
            icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
            label: <span style={{ color: "#52c41a" }}>Xác nhận đơn</span>,
            onClick: () => handleConfirm(record.id),
          });

          items.push({
            key: "cancel",
            icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
            label: <span style={{ color: "#ff4d4f" }}>Hủy đơn</span>,
            onClick: () => handleOpenCancel(record.id),
          });
        }

        if (record.status === "CONFIRMED") {
          items.push({
            key: "ship",
            icon: <CarOutlined style={{ color: "#fa8c16" }} />,
            label: "Giao hàng",
            onClick: () => {
              console.log("SHIP CLICK");
              handleOpenShip(record.id);
            },
          });
        }

        if (record.status === "SHIPPING") {
          items.push({
            key: "complete",
            icon: <CheckOutlined style={{ color: "#52c41a" }} />,
            label: "Hoàn thành",
            onClick: () => handleOpenComplete(record.id),
          });
        }

        return (
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Button
              size="small"
              loading={loading}
              icon={<DownOutlined style={{ fontSize: 10 }} />}
              iconPosition="end"
              style={{
                borderRadius: 6,
                background: "#fafafa",
                border: "1px solid #d9d9d9",
                fontWeight: 500,
              }}
            >
              Thao tác
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={orders}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
        scroll={{ x: 1200 }}
      />

      <OrderDetail
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
      />

      <ConfirmActionModal
        open={openShip}
        setOpen={setOpenShip}
        loading={loading}
        title="Giao hàng"
        content="Xác nhận tạo đơn vận chuyển?"
        okText="Xác nhận giao hàng"
        onSubmit={handleShip}
      />

      <ConfirmActionModal
        open={openComplete}
        setOpen={setOpenComplete}
        loading={loading}
        title="Hoàn thành đơn hàng"
        content="Xác nhận đơn hàng đã giao thành công?"
        okText="Hoàn thành"
        onSubmit={handleComplete}
      />

      <CancelOrderModal
        open={openCancel}
        setOpen={setOpenCancel}
        loading={loading}
        onSubmit={handleCancel}
      />
    </>
  );
}

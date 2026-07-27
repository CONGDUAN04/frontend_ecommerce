import { useState } from "react";
import { Button, Dropdown, Tag, Typography } from "antd";

import {
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  DownOutlined,
} from "@ant-design/icons";

import BaseTable from "../../../../components/common/admin/BaseTable";
import { renderIndex } from "../../../../components/common/admin/tableColumns";
import { formatDateTime } from "../../../../utils/formatDate";

import { useReturn } from "../hook/useReturn";
import { returnStatusMap } from "../../../../constants/return";
import ReturnDetailModal from "./ReturnDetailModal";
import ApproveReturnModal from "./ApproveReturnModal";
import ReceiveReturnModal from "./ReceiveReturnModal";
import RejectReturnModal from "./RejectReturnModal";
import CompleteReturnModal from "./CompleteReturnModal";
import InspectingReturnModal from "./InspectingReturnModal";

const { Text } = Typography;

const reasonMap = {
  DEFECTIVE: "Sản phẩm bị lỗi",
  WRONG_PRODUCT: "Giao sai sản phẩm",
  DAMAGED_SHIPPING: "Hư hỏng khi vận chuyển",
  CHANGE_MIND: "Đổi ý",
  OTHER: "Khác",
};

export default function ReturnTable({
  returns,
  current,
  pageSize,
  total,
  updatePagination,
  loadReturns,
}) {
  const [loading, setLoading] = useState(false);

  const [openDetail, setOpenDetail] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);
  const [openReceive, setOpenReceive] = useState(false);
  const [openInspecting, setOpenInspecting] = useState(false);
  const [selectedReturnId, setSelectedReturnId] = useState(null);

  const { getById, approve, receive, reject, complete, inspecting } =
    useReturn();

  const handleViewDetail = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setOpenDetail(true);
    }

    setLoading(false);
  };

  const handleOpenApprove = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setSelectedReturnId(id);
      setOpenApprove(true);
    }

    setLoading(false);
  };

  const handleOpenReject = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setSelectedReturnId(id);
      setOpenReject(true);
    }

    setLoading(false);
  };
  const handleOpenComplete = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setSelectedReturnId(id);
      setOpenComplete(true);
    }

    setLoading(false);
  };

  const handleOpenReceive = async (id) => {
    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setSelectedReturnId(id);
      setOpenReceive(true);
    }

    setLoading(false);
  };
  const handleReceive = async (values) => {
    setLoading(true);

    const res = await receive(selectedReturnId, values);

    if (res) {
      setOpenReceive(false);
      setSelectedReturnId(null);
      await loadReturns();
    }

    setLoading(false);

    return !!res;
  };

  const handleApprove = async (values) => {
    setLoading(true);

    const res = await approve(selectedReturnId, values);

    if (res) {
      setOpenApprove(false);
      setSelectedReturnId(null);
      await loadReturns();
    }

    setLoading(false);

    return !!res;
  };
  const handleOpenInspecting = async (id) => {
    console.log("Click id =", id);

    setLoading(true);

    const res = await getById(id);

    if (res?.data) {
      console.log("setSelectedReturnId =", id);

      setDataDetail(res.data);
      setSelectedReturnId(id);
      setOpenInspecting(true);
    }

    setLoading(false);
  };

  const handleInspecting = async (values) => {
    console.log("selectedReturnId =", selectedReturnId);
    console.log("values =", values);

    setLoading(true);

    const res = await inspecting(selectedReturnId, values);

    if (res) {
      setOpenInspecting(false);
      setSelectedReturnId(null);

      await loadReturns();
    }

    setLoading(false);

    return !!res;
  };
  const handleReject = async (values) => {
    setLoading(true);

    const res = await reject(selectedReturnId, values);

    if (res) {
      setOpenReject(false);
      setSelectedReturnId(null);
      await loadReturns();
    }

    setLoading(false);

    return !!res;
  };

  const handleComplete = async (values) => {
    setLoading(true);

    try {
      const res = await complete(selectedReturnId, values);

      if (!res) return false;

      setOpenComplete(false);
      setSelectedReturnId(null);

      await loadReturns();

      return true;
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    renderIndex(current, pageSize),

    {
      title: "Mã YC",
      dataIndex: "id",
      width: 90,
      align: "center",
      render: (id) => (
        <Text strong style={{ color: "#1677ff" }}>
          #{id}
        </Text>
      ),
    },

    {
      title: "Mã đơn",
      dataIndex: ["order", "orderCode"],
      width: 150,
      align: "center",
      render: (orderCode) => (
        <Text strong style={{ color: "#1677ff" }}>
          {orderCode}
        </Text>
      ),
    },
    {
      title: "Khách hàng",
      dataIndex: ["order", "receiverName"],
      width: 180,
      align: "center",
    },

    {
      title: "Giá trị đơn",
      dataIndex: ["order", "finalPrice"],
      width: 150,
      align: "center",
      render: (value) => (
        <Text style={{ fontWeight: 500, color: "var(--text-main)" }}>
          {Number(value).toLocaleString("vi-VN")}đ
        </Text>
      ),
    },
    {
      title: "Tiền hoàn",
      dataIndex: "refundAmount",
      width: 150,
      align: "center",
      render: (value) =>
        value ? (
          <Text strong style={{ color: "#cf1322" }}>
            {Number(value).toLocaleString("vi-VN")}đ
          </Text>
        ) : (
          <Text type="secondary">--</Text>
        ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 160,
      align: "center",
      render: (status) => (
        <Tag
          style={{
            borderRadius: 12,
            padding: "0 10px",
            fontWeight: 500,
          }}
        >
          {returnStatusMap[status]}
        </Tag>
      ),
    },

    {
      title: "Ngày yêu cầu",
      dataIndex: "createdAt",
      width: 180,
      align: "center",
      render: (value) => <Text type="secondary">{formatDateTime(value)}</Text>,
    },

    {
      title: "Thao tác",
      width: 170,
      align: "center",
      fixed: "right",
      render: (_, record) => {
        const items = [
          {
            key: "detail",
            icon: <EyeOutlined style={{ color: "#1677ff" }} />,
            label: (
              <span style={{ color: "#1677ff", fontWeight: 600 }}>
                Xem chi tiết
              </span>
            ),
            onClick: () => handleViewDetail(record.id),
          },
        ];

        // ==========================
        // PENDING
        // ==========================
        if (record.status === "PENDING") {
          items.push(
            {
              key: "approve",
              icon: <CheckCircleOutlined style={{ color: "#52c41a" }} />,
              label: (
                <span style={{ color: "#52c41a", fontWeight: 600 }}>
                  Duyệt yêu cầu
                </span>
              ),
              onClick: () => handleOpenApprove(record.id),
            },
            {
              key: "reject",
              icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
              label: (
                <span style={{ color: "#ff4d4f", fontWeight: 600 }}>
                  Từ chối yêu cầu
                </span>
              ),
              onClick: () => handleOpenReject(record.id),
            },
          );
        }

        // ==========================
        // APPROVED
        // ==========================
        if (record.status === "APPROVED") {
          items.push({
            key: "receive",
            icon: <CheckCircleOutlined style={{ color: "#1677ff" }} />,
            label: (
              <span style={{ color: "#1677ff", fontWeight: 600 }}>
                Xác nhận đã nhận hàng
              </span>
            ),
            onClick: () => handleOpenReceive(record.id),
          });
        }

        // ==========================
        // RECEIVED
        // ==========================
        if (record.status === "RECEIVED") {
          items.push({
            key: "inspecting",
            icon: <CheckCircleOutlined style={{ color: "#fa8c16" }} />,
            label: (
              <span style={{ color: "#fa8c16", fontWeight: 600 }}>
                Bắt đầu kiểm tra
              </span>
            ),
            onClick: () => handleOpenInspecting(record.id),
          });
        }

        // ==========================
        // INSPECTING
        // ==========================
        if (record.status === "INSPECTING") {
          items.push(
            {
              key: "complete",
              icon: <DollarOutlined style={{ color: "#13c2c2" }} />,
              label: (
                <span style={{ color: "#13c2c2", fontWeight: 600 }}>
                  Hoàn tiền
                </span>
              ),
              onClick: () => handleOpenComplete(record.id),
            },
            {
              key: "reject",
              icon: <CloseCircleOutlined style={{ color: "#ff4d4f" }} />,
              label: (
                <span style={{ color: "#ff4d4f", fontWeight: 600 }}>
                  Từ chối hoàn tiền
                </span>
              ),
              onClick: () => handleOpenReject(record.id),
            },
          );
        }

        return (
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            menu={{ items }}
          >
            <Button
              size="small"
              icon={<DownOutlined style={{ fontSize: 10 }} />}
              iconPosition="end"
              loading={loading}
              style={{
                borderRadius: 8,
                border: "1px solid #d9d9d9",
                background: "#fff",
                fontWeight: 600,
                minWidth: 110,
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
        data={returns}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
        scroll={{ x: 1400 }}
      />

      <ReturnDetailModal
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
        dataDetail={dataDetail}
      />
      <ApproveReturnModal
        open={openApprove}
        setOpen={setOpenApprove}
        loading={loading}
        onSubmit={handleApprove}
        order={dataDetail?.order}
      />
      <InspectingReturnModal
        open={openInspecting}
        setOpen={setOpenInspecting}
        loading={loading}
        onSubmit={handleInspecting}
        order={dataDetail?.order}
      />

      <ReceiveReturnModal
        open={openReceive}
        setOpen={setOpenReceive}
        loading={loading}
        onSubmit={handleReceive}
        order={dataDetail?.order}
      />
      <CompleteReturnModal
        open={openComplete}
        setOpen={setOpenComplete}
        loading={loading}
        onSubmit={handleComplete}
        order={dataDetail?.order}
      />
      <RejectReturnModal
        open={openReject}
        setOpen={setOpenReject}
        loading={loading}
        onSubmit={handleReject}
      />
    </>
  );
}

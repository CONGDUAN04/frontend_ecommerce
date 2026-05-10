import { useState } from "react";
import { Tag, Switch, Popconfirm } from "antd";
import BaseTable from "../../../../components/common/BaseTable";
import BaseActionButtons from "../../../../components/common/BaseActionButtons";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns";

import { useVariant } from "../hooks/useVariant";

import VariantDetail from "./variant.detail";
import UpdateVariantForm from "./variant.update";

export default function VariantTable({
  dataVariants,
  loadVariants,
  current,
  pageSize,
  total,
  updatePagination,
}) {
  const [openDetail, setOpenDetail] = useState(false);

  const [dataDetail, setDataDetail] = useState(null);

  const [openUpdate, setOpenUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);

  const [loading, setLoading] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(null);

  const { remove, updateStatus, getById } = useVariant();

  const handleViewDetail = async (id) => {
    const res = await getById(id);

    if (res?.data) {
      setDataDetail(res.data);
      setOpenDetail(true);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);

    const res = await remove(id);

    if (res) {
      await loadVariants();
    }

    setLoading(false);
  };

  const handleToggleStatus = async (record, isActive) => {
    setLoadingStatus(record.id);

    try {
      const res = await updateStatus(record.id, {
        isActive,
      });

      if (res) {
        await loadVariants();
      }
    } finally {
      setLoadingStatus(null);
    }
  };

  const currencyFormatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const columns = [
    renderIndex(current, pageSize),

    renderId(),

    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
      align: "center",
    },

    {
      title: "Màu sắc",
      align: "center",
      width: 180,

      render: (_, record) => {
        const color = record.productColor?.color;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: color?.code || "#fff",
                border: "1px solid #d9d9d9",
                flexShrink: 0,
              }}
            />

            <span
              style={{
                fontWeight: 500,
              }}
            >
              {color?.name || "Không có"}
            </span>
          </div>
        );
      },
    },

    {
      title: "Dung lượng",
      dataIndex: "storage",
      align: "center",

      render: (storage) => storage || "-",
    },

    {
      title: "Giá bán",
      dataIndex: "price",
      align: "center",

      render: (value) => currencyFormatter.format(value),
    },

    {
      title: "Kho",
      dataIndex: "quantity",
      align: "center",

      render: (quantity) => {
        let color = "green";
        let text = quantity;

        if (quantity === 0) {
          color = "default";
          text = "Hết hàng";
        } else if (quantity <= 5) {
          color = "red";
        } else if (quantity <= 20) {
          color = "orange";
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "isActive",
      align: "center",

      render: (isActive, record) => {
        const active = isActive ?? true;

        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Tag color={active ? "green" : "red"}>
              {active ? "Đang bán" : "Ngừng bán"}
            </Tag>

            <Popconfirm
              title={
                active
                  ? "Bạn có chắc muốn vô hiệu hóa biến thể này?"
                  : "Bạn có chắc muốn kích hoạt lại biến thể này?"
              }
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleToggleStatus(record, !active)}
            >
              <Switch
                size="small"
                checked={active}
                loading={loadingStatus === record.id}
              />
            </Popconfirm>
          </div>
        );
      },
    },

    {
      title: "Thao tác",
      align: "center",
      fixed: "right",

      render: (_, record) => (
        <BaseActionButtons
          record={record}
          onView={() => handleViewDetail(record.id)}
          onEdit={() => {
            setDataUpdate(record);
            setOpenUpdate(true);
          }}
          onDelete={() => handleDelete(record.id)}
          loading={loading}
          disableEdit={!record.isActive}
          disableDelete={!record.isActive}
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataVariants}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <VariantDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateVariantForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadVariants={loadVariants}
      />
    </>
  );
}

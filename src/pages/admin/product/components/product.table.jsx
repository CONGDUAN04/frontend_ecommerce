import { useState } from "react";
import { Tag, Switch, Popconfirm } from "antd";
import BaseTable from "../../../../components/common/admin/BaseTable";
import BaseActionButtons from "../../../../components/common/admin/BaseActionButtons";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/admin/tableColumns";

import { useProduct } from "../hooks/useProduct";
import ProductDetail from "./product.detail";
import UpdateProductForm from "./product.update";

export default function ProductTable({
  dataProducts,
  loadProducts,
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

  const { remove, updateStatus } = useProduct();

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await remove(id);
    if (res) await loadProducts();
    setLoading(false);
  };

  const handleToggleStatus = async (record, isActive) => {
    setLoadingStatus(record.id);
    try {
      const res = await updateStatus(record.id, { isActive });
      if (res) await loadProducts();
    } finally {
      setLoadingStatus(null);
    }
  };

  const columns = [
    renderIndex(current, pageSize),
    renderId(),

    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Nhóm",
      dataIndex: ["group", "name"],
      align: "center",
      render: (value) => value || "-",
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
                  ? "Bạn có chắc muốn vô hiệu hóa sản phẩm này?"
                  : "Bạn có chắc muốn kích hoạt lại sản phẩm này?"
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
          onView={() => {
            setDataDetail(record);
            setOpenDetail(true);
          }}
          onEdit={() => {
            if (!record.isActive) return;
            setDataUpdate(record);
            setOpenUpdate(true);
          }}
          onDelete={() => handleDelete(record.id)}
          disableEdit={!record.isActive}
          disableDelete={!record.isActive}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataProducts}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <ProductDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateProductForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadProducts={loadProducts}
      />
    </>
  );
}

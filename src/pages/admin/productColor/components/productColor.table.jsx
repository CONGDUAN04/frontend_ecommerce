import { useState } from "react";

import { Tag, Image } from "antd";

import BaseTable from "../../../../components/common/admin/BaseTable";

import BaseActionButtons from "../../../../components/common/admin/BaseActionButtons";

import {
  renderIndex,
  renderId,
} from "../../../../components/common/admin/tableColumns";

import ImagePreviewItem from "../../../../components/common/admin/ImagePreviewItem";

import { useProductColor } from "../hooks/useProductColor";

import ProductColorDetail from "./productColor.detail";

import UpdateProductColorForm from "./productColor.update";

export default function ProductColorTable({
  dataProductColors,
  loadProductColors,
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

  const { remove, getById } = useProductColor();
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
      await loadProductColors();
    }

    setLoading(false);
  };
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

      render: (_, record) => {
        const color = record.color;

        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: color?.code || "#fff",
                border: "1px solid #d9d9d9",
                flexShrink: 0,
              }}
            />

            <span>{color?.name || "-"}</span>
          </div>
        );
      },
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      align: "center",

      render: (image) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={image}
            preview={{
              mask: "Xem",
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 6,
              objectFit: "cover",
              border: "1px solid #f0f0f0",
            }}
          />
        </div>
      ),
    },

    {
      title: "Biến thể",
      dataIndex: ["_count", "variants"],
      align: "center",

      render: (count) => <Tag color="blue">{count} variants</Tag>,
    },

    {
      title: "Thao tác",
      align: "center",
      fixed: "right",

      render: (_, record) => (
        <BaseActionButtons
          record={record}
          onView={() => {
            handleViewDetail(record.id);
          }}
          onEdit={() => {
            setDataUpdate(record);
            setOpenUpdate(true);
          }}
          onDelete={() => handleDelete(record.id)}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataProductColors}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <ProductColorDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateProductColorForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadProductColors={loadProductColors}
      />
    </>
  );
}

// src/pages/admin/color/components/color.table.jsx

import { useState } from "react";

import BaseTable from "../../../../components/common/admin/BaseTable.jsx";
import BaseActionButtons from "../../../../components/common/admin/BaseActionButtons.jsx";

import {
  renderIndex,
  renderId,
} from "../../../../components/common/admin/tableColumns.jsx";

import { useColor } from "../hooks/useColor.js";

import ColorDetail from "./color.detail.jsx";
import UpdateColorForm from "./color.update.jsx";

export default function ColorTable({
  dataColors,
  loadColor,
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

  const { remove, getById } = useColor();

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
      await loadColor();
    }

    setLoading(false);
  };

  const columns = [
    renderIndex(current, pageSize),

    renderId(),

    {
      title: <div style={{ fontWeight: 600 }}>Tên màu</div>,
      dataIndex: "name",
      align: "center",
    },

    {
      title: <div style={{ fontWeight: 600 }}>Màu</div>,
      dataIndex: "code",
      align: "center",

      render: (code) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: code || "#fff",
              border: "1px solid #ddd",
            }}
          />
        </div>
      ),
    },

    {
      title: <div style={{ fontWeight: 600 }}>Mã màu</div>,
      dataIndex: "code",
      align: "center",
    },

    {
      title: <div style={{ fontWeight: 600 }}>Thao tác</div>,
      align: "center",
      width: 150,
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
          deleteTitle="Xóa màu sắc"
          deleteDescription="Hành động này không thể hoàn tác!"
          loading={loading}
        />
      ),
    },
  ];

  return (
    <>
      <BaseTable
        columns={columns}
        data={dataColors}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <ColorDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateColorForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadColor={loadColor}
      />
    </>
  );
}

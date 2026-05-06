import { useState } from "react";
import { Tag, Switch, Popconfirm } from "antd";
import BaseTable from "../../../../components/common/BaseTable.jsx";
import BaseActionButtons from "../../../../components/common/BaseActionButtons.jsx";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns.jsx";
import ProductGroupDetail from "./productGroup.detail";
import UpdateProductGroupForm from "./productGroup.update";
import { useProductGroup } from "../hooks/useProductGroup";

export default function ProductGroupTable({
  dataGroups,
  loadGroups,
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
  const [loadingStatus, setLoadingStatus] = useState(false);

  const { remove, updateStatus } = useProductGroup();

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await remove(id);
    if (res) await loadGroups();
    setLoading(false);
  };

  const handleToggleStatus = async (record, isActive) => {
    setLoadingStatus(true);
    try {
      const res = await updateStatus(record.id, { isActive });
      if (res) await loadGroups();
    } finally {
      setLoadingStatus(false);
    }
  };

  const columns = [
    renderIndex(current, pageSize),
    renderId(),
    {
      title: "Tên nhóm",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Series",
      dataIndex: "series",
      align: "center",
      render: (value) => value || "-",
    },
    {
      title: "Thương hiệu",
      dataIndex: ["brand", "name"],
      align: "center",
      render: (value) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      align: "center",
      render: (value) => <Tag color="purple">{value}</Tag>,
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
                  ? "Bạn có chắc muốn vô hiệu hóa nhóm sản phẩm này?"
                  : "Bạn có chắc muốn kích hoạt lại nhóm sản phẩm này?"
              }
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleToggleStatus(record, !active)}
            >
              <Switch size="small" checked={active} loading={loadingStatus} />
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
        data={dataGroups}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <ProductGroupDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateProductGroupForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadGroups={loadGroups}
      />
    </>
  );
}

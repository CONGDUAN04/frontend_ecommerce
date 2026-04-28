import { useState } from "react";
import BaseTable from "../../../../components/common/BaseTable.jsx";
import BaseActionButtons from "../../../../components/common/BaseActionButtons.jsx";
import UserDetail from "./user.detail.jsx";
import UpdateUserForm from "./user.update.jsx";
import { useUser } from "../hooks/useUser.js";
import {
  renderIndex,
  renderId,
} from "../../../../components/common/tableColumns.jsx";
import { Tag, Switch, Popconfirm } from "antd";

export default function UserTable({
  dataUsers,
  loadUser,
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
  const { remove, updateStatus } = useUser();

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await remove(id);
    if (res) await loadUser();
    setLoading(false);
  };

  const handleToggleStatus = async (record, isActive) => {
    setLoadingStatus(true);
    try {
      const res = await updateStatus(record.id, { isActive });

      if (res) await loadUser();
    } finally {
      setLoadingStatus(false);
    }
  };

  const columns = [
    renderIndex(current, pageSize),
    renderId(),

    {
      title: "Họ và tên",
      dataIndex: "fullName",
      align: "center",
    },

    {
      title: "Email",
      dataIndex: "username",
      align: "center",
    },

    {
      title: "Role",
      dataIndex: ["role", "name"],
      align: "center",
      render: (role) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: "Xác thực",
      dataIndex: "isVerified",
      align: "center",
      render: (isVerified) => (
        <Tag color={isVerified ? "green" : "orange"}>
          {isVerified ? "Đã xác thực" : "Chưa xác thực"}
        </Tag>
      ),
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
              {active ? "Hoạt động" : "Đã khóa"}
            </Tag>

            <Popconfirm
              title={
                active
                  ? "Bạn có chắc muốn vô hiệu hóa người dùng này?"
                  : "Bạn có chắc muốn kích hoạt lại người dùng này?"
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
        data={dataUsers}
        current={current}
        pageSize={pageSize}
        total={total}
        updatePagination={updatePagination}
      />

      <UserDetail
        dataDetail={dataDetail}
        openDetail={openDetail}
        setOpenDetail={setOpenDetail}
      />

      <UpdateUserForm
        openUpdate={openUpdate}
        setOpenUpdate={setOpenUpdate}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        loadUser={loadUser}
      />
    </>
  );
}

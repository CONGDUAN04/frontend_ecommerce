import { Descriptions, Empty, Tag } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import ImagePreviewItem from "../../../../components/common/ImagePreviewItem.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";

export default function UserDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => setOpenDetail(false);

  if (!dataDetail) {
    return (
      <BaseModal
        open={openDetail}
        onCancel={handleClose}
        title="Chi tiết người dùng"
        footer={null}
      >
        <Empty />
      </BaseModal>
    );
  }

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết người dùng"
      footer={null}
    >
      <Descriptions column={1} bordered size="middle">
        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {dataDetail.username}
        </Descriptions.Item>
        <Descriptions.Item label="Họ và tên">
          {dataDetail.fullName || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {dataDetail.phone || "N/A"}
        </Descriptions.Item>

        <Descriptions.Item label="Vai trò">
          <Tag color="blue">{dataDetail.role?.name || "N/A"}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Loại tài khoản">
          <Tag color="purple">{dataDetail.accountType || "N/A"}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          <Tag color={dataDetail.isActive ? "success" : "error"}>
            {dataDetail.isActive ? "Hoạt động" : "Bị khóa"}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Xác thực email">
          <Tag color={dataDetail.isVerified ? "success" : "warning"}>
            {dataDetail.isVerified ? "Đã xác thực" : "Chưa xác thực"}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Đăng nhập gần nhất">
          {dataDetail.lastLoginAt
            ? formatDateTime(dataDetail.lastLoginAt)
            : "Chưa từng đăng nhập"}
        </Descriptions.Item>

        <Descriptions.Item label="Đổi mật khẩu gần nhất">
          {dataDetail.passwordChangedAt
            ? formatDateTime(dataDetail.passwordChangedAt)
            : "Chưa từng đổi mật khẩu"}
        </Descriptions.Item>

        <Descriptions.Item label="Avatar">
          <ImagePreviewItem
            src={
              dataDetail.avatar
                ? `${dataDetail.avatar}?t=${dataDetail.updatedAt}`
                : null
            }
          />
        </Descriptions.Item>

        <Descriptions.Item label="Ngày tạo">
          {formatDateTime(dataDetail.createdAt)}
        </Descriptions.Item>

        <Descriptions.Item label="Cập nhật lần cuối">
          {formatDateTime(dataDetail.updatedAt)}
        </Descriptions.Item>
      </Descriptions>
    </BaseModal>
  );
}

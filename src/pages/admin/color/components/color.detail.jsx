import { Descriptions, Empty } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";

import { formatDateTime } from "../../../../utils/formatDate.js";

export default function ColorDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => {
    setOpenDetail(false);
  };

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết màu sắc"
      footer={null}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Descriptions column={1} bordered size="middle">
          <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

          <Descriptions.Item label="Tên màu">
            {dataDetail.name}
          </Descriptions.Item>

          <Descriptions.Item label="Mã màu">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: dataDetail.code,
                  border: "1px solid #ddd",
                }}
              />

              <span>{dataDetail.code}</span>
            </div>
          </Descriptions.Item>

          <Descriptions.Item label="Số màu sản phẩm">
            {dataDetail._count?.productColors || 0}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày tạo">
            {formatDateTime(dataDetail.createdAt)}
          </Descriptions.Item>

          <Descriptions.Item label="Cập nhật">
            {formatDateTime(dataDetail.updatedAt)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </BaseModal>
  );
}

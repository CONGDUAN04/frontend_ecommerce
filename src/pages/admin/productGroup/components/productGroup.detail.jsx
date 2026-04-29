import { Descriptions, Empty, Tag } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { formatDateTime } from "../../../../utils/formatDate";
import ImagePreviewItem from "../../../../components/common/ImagePreviewItem.jsx";

export default function ProductGroupDetail({
  dataDetail,
  openDetail,
  setOpenDetail,
}) {
  const handleClose = () => setOpenDetail(false);

  if (!dataDetail) {
    return (
      <BaseModal
        open={openDetail}
        onCancel={handleClose}
        title="Chi tiết nhóm sản phẩm"
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
      title="Chi tiết nhóm sản phẩm"
      footer={null}
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>
        <Descriptions.Item label="Tên nhóm">
          {dataDetail.name}
        </Descriptions.Item>
        <Descriptions.Item label="Slug">{dataDetail.slug}</Descriptions.Item>
        <Descriptions.Item label="Series">
          {dataDetail.series || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Thương hiệu">
          <Tag color="blue">{dataDetail.brand?.name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Danh mục">
          <Tag color="purple">{dataDetail.category?.name}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          <Tag color={dataDetail.isActive ? "green" : "red"}>
            {dataDetail.isActive ? "Hoạt động" : "Ngừng hoạt động"}
          </Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Thumbnail">
          <ImagePreviewItem
            src={
              dataDetail.thumbnail
                ? `${dataDetail.thumbnail}?t=${dataDetail.updatedAt}`
                : null
            }
          />
        </Descriptions.Item>
        <Descriptions.Item label="Ngày tạo">
          {formatDateTime(dataDetail.createdAt)}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật">
          {formatDateTime(dataDetail.updatedAt)}
        </Descriptions.Item>
      </Descriptions>
    </BaseModal>
  );
}

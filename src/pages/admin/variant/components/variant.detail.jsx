import { Descriptions, Empty, Tag } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";

import ImagePreviewItem from "../../../../components/common/admin/ImagePreviewItem";

import { formatDateTime } from "../../../../utils/formatDate";

const currencyFormatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function VariantDetail({
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
        title="Chi tiết biến thể"
        footer={null}
      >
        <Empty />
      </BaseModal>
    );
  }

  const color = dataDetail.productColor?.color;

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết biến thể"
      footer={null}
    >
      <Descriptions bordered column={1}>
        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

        <Descriptions.Item label="SKU">{dataDetail.sku}</Descriptions.Item>

        <Descriptions.Item label="Sản phẩm">
          {dataDetail.product?.name || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Dòng sản phẩm">
          {dataDetail.product?.group?.name || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Series">
          {dataDetail.product?.group?.series || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Thương hiệu">
          {dataDetail.product?.brand?.name || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Danh mục">
          {dataDetail.product?.category?.name || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Màu sắc">
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
                backgroundColor: color?.code || "#fff",
                border: "1px solid #d9d9d9",
              }}
            />

            <span>{color?.name || "-"}</span>
          </div>
        </Descriptions.Item>

        <Descriptions.Item label="Dung lượng">
          {dataDetail.storage || "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Giá bán">
          {currencyFormatter.format(dataDetail.price || 0)}
        </Descriptions.Item>

        <Descriptions.Item label="Giá gốc">
          {dataDetail.comparePrice
            ? currencyFormatter.format(dataDetail.comparePrice)
            : "-"}
        </Descriptions.Item>

        <Descriptions.Item label="Tồn kho">
          <Tag
            color={
              dataDetail.quantity === 0
                ? "default"
                : dataDetail.quantity <= 5
                  ? "red"
                  : dataDetail.quantity <= 20
                    ? "orange"
                    : "green"
            }
          >
            {dataDetail.quantity === 0 ? "Hết hàng" : dataDetail.quantity}
          </Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Đã bán">{dataDetail.sold}</Descriptions.Item>

        <Descriptions.Item label="Ảnh biến thể">
          <ImagePreviewItem src={dataDetail.productColor?.image} />
        </Descriptions.Item>

        <Descriptions.Item label="Trạng thái">
          <Tag color={dataDetail.isActive ? "green" : "red"}>
            {dataDetail.isActive ? "Đang bán" : "Ngừng bán"}
          </Tag>
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

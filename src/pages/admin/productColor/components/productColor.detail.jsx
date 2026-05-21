import { Descriptions, Empty, Tag, Table } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";

import ImagePreviewItem from "../../../../components/common/admin/ImagePreviewItem";

import { formatDateTime } from "../../../../utils/formatDate";

export default function ProductColorDetail({
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
        title="Chi tiết màu sản phẩm"
        footer={null}
      >
        <Empty />
      </BaseModal>
    );
  }

  const variantColumns = [
    {
      title: "SKU",
      dataIndex: "sku",
      align: "center",
    },

    {
      title: "Dung lượng",
      dataIndex: "storage",
      align: "center",
    },

    {
      title: "Giá",
      dataIndex: "price",
      align: "center",

      render: (value) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(value),
    },

    {
      title: "Kho",
      dataIndex: "quantity",
      align: "center",

      render: (quantity) => {
        let color = "green";

        if (quantity === 0) {
          color = "red";
        } else if (quantity <= 5) {
          color = "orange";
        }

        return <Tag color={color}>{quantity}</Tag>;
      },
    },

    {
      title: "Trạng thái",
      dataIndex: "isActive",
      align: "center",

      render: (active) => (
        <Tag color={active ? "green" : "red"}>
          {active ? "Đang bán" : "Ngừng bán"}
        </Tag>
      ),
    },
  ];

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết màu sản phẩm"
      footer={null}
      width={700}
    >
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="ID">{dataDetail.id}</Descriptions.Item>

        <Descriptions.Item label="Sản phẩm">
          {dataDetail.product?.name}
        </Descriptions.Item>

        <Descriptions.Item label="Màu sắc">
          <Tag color={dataDetail.color?.code}>{dataDetail.color?.name}</Tag>
        </Descriptions.Item>

        <Descriptions.Item label="Ảnh">
          <ImagePreviewItem src={dataDetail.image} variant="icon" size={80} />
        </Descriptions.Item>

        <Descriptions.Item label="Số variants">
          {dataDetail._count?.variants || 0}
        </Descriptions.Item>

        <Descriptions.Item label="Ngày tạo">
          {formatDateTime(dataDetail.createdAt)}
        </Descriptions.Item>

        <Descriptions.Item label="Cập nhật">
          {formatDateTime(dataDetail.updatedAt)}
        </Descriptions.Item>
      </Descriptions>

      <div style={{ marginTop: 20 }}>
        <div
          style={{
            fontSize: 15,
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Danh sách variants
        </div>

        <Table
          columns={variantColumns}
          dataSource={dataDetail.variants || []}
          rowKey="id"
          pagination={false}
          bordered
          size="small"
        />
      </div>
    </BaseModal>
  );
}

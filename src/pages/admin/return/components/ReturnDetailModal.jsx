import {
  Card,
  Col,
  Descriptions,
  Empty,
  Image,
  Row,
  Table,
  Typography,
} from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";
import {
  returnReasonMap,
  returnStatusMap,
  refundMethodMap,
} from "../../../../constants/return";
import {
  paymentMethodMap,
  paymentStatusMap,
  statusMap,
} from "../../../../constants/order";
import { formatDateTime } from "../../../../utils/formatDate";
import ReturnTimeline from "../../../../components/common/order/ReturnTimeline";
const { Text } = Typography;

export default function ReturnDetailModal({
  openDetail,
  setOpenDetail,
  dataDetail,
}) {
  const descriptionConfig = {
    column: 1,
    size: "small",
    bordered: false,
    layout: "horizontal",
    labelStyle: {
      width: 120,
      color: "#8c8c8c",
      fontWeight: 500,
      paddingBottom: 8,
    },
    contentStyle: {
      color: "#262626",
      fontWeight: 500,
      paddingBottom: 8,
    },
  };

  const columns = [
    {
      title: "Sản phẩm",
      render: (_, record) => {
        const item = record.orderItem;
        return (
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Image
              src={item.thumbnail}
              width={45}
              height={45}
              preview
              fallback="https://placehold.co/45x45?text=No+Image"
              style={{
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #f0f0f0",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Text style={{ fontSize: 13, fontWeight: 500, color: "#262626" }}>
                {item.productName}
              </Text>
              <Text type="secondary" style={{ fontSize: 11 }}>
                {[item.variantColor, item.variantStorage]
                  .filter(Boolean)
                  .join(" / ")}
              </Text>
            </div>
          </div>
        );
      },
    },
    {
      title: "SL",
      dataIndex: "quantity",
      align: "center",
      width: 50,
    },
    {
      title: "Giá bán",
      align: "center",
      width: 100,
      render: (_, record) =>
        `${Number(record.orderItem.price).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Lý do cụ thể",
      align: "center",
      dataIndex: "reason",
      width: 150,
      render: (value) => <span style={{ fontSize: 13 }}>{value || "-"}</span>,
    },
  ];

  return (
    <BaseModal
      open={openDetail}
      onCancel={() => setOpenDetail(false)}
      footer={null}
      width={1000}
      title={
        <div
          style={{
            textAlign: "center",
            borderBottom: "1px solid #f0f0f0",
            paddingBottom: 12,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>
            Chi tiết yêu cầu trả hàng
          </span>
        </div>
      }
    >
      {!dataDetail ? (
        <Empty justify="center" style={{ margin: "40px 0" }} />
      ) : (
        <Row gutter={[24, 0]} style={{ marginTop: 16 }}>
          <Col
            span={14}
            style={{ borderRight: "1px solid #f0f0f0", paddingRight: 24 }}
          >
            <Table
              rowKey="id"
              columns={columns}
              dataSource={dataDetail.returnItems}
              pagination={false}
              size="small"
              style={{ marginBottom: 20 }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    // color: "#1677ff",
                    marginBottom: 8,
                    fontSize: 12,
                  }}
                >
                  THÔNG TIN KHÁCH HÀNG YÊU CẦU
                </div>
                <Descriptions {...descriptionConfig}>
                  <Descriptions.Item label="Mã yêu cầu">
                    <Text copyable strong>
                      #{dataDetail.id}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày tạo">
                    {formatDateTime(dataDetail.createdAt)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Lý do chung">
                    <span>{returnReasonMap[dataDetail.reason] || "-"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú khách">
                    <span>{dataDetail.note || "-"}</span>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div>
                <div
                  style={{
                    fontWeight: 600,
                    // color: "#52c41a",
                    marginBottom: 8,
                    fontSize: 12,
                  }}
                >
                  KẾT QUẢ XỬ LÝ ĐƠN TRẢ
                </div>
                <Card
                  size="small"
                  title="Tiến trình xử lý"
                  style={{ marginTop: 20 }}
                >
                  <ReturnTimeline
                    returnRequest={dataDetail}
                    withCard={false}
                    variant="admin"
                  />
                </Card>
                <Descriptions {...descriptionConfig}>
                  <Descriptions.Item label="Trạng thái">
                    <Text strong>{returnStatusMap[dataDetail.status]}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Tiền hoàn lại">
                    {dataDetail.order.payment?.refundAmount ? (
                      <Text strong style={{ fontSize: 15 }}>
                        {Number(
                          dataDetail.order.payment.refundAmount,
                        ).toLocaleString("vi-VN")}
                        đ
                      </Text>
                    ) : (
                      <Text type="secondary">-</Text>
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ngày giải quyết">
                    {dataDetail.resolvedAt
                      ? formatDateTime(dataDetail.resolvedAt)
                      : "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Ghi chú Admin">
                    <span>{dataDetail.adminNote || "-"}</span>
                  </Descriptions.Item>
                  <Descriptions.Item label="Phương thức hoàn">
                    {refundMethodMap[dataDetail.order.payment?.refundMethod] ||
                      "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Thông tin nhận">
                    {dataDetail.order.payment?.refundBank || "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Ghi chú hoàn tiền">
                    {dataDetail.order.payment?.refundNote || "-"}
                  </Descriptions.Item>

                  <Descriptions.Item label="Ngày hoàn tiền">
                    {dataDetail.order.payment?.refundedAt
                      ? formatDateTime(dataDetail.order.payment.refundedAt)
                      : "-"}
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Col>
          <Col span={10} style={{ paddingLeft: 24 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#262626",
                    marginBottom: 12,
                    fontSize: 14,
                  }}
                >
                  Đơn hàng gốc
                </div>
                <Descriptions
                  {...descriptionConfig}
                  labelStyle={{ width: 110 }}
                >
                  <Descriptions.Item label="Mã đơn hàng">
                    <Text copyable strong>
                      {dataDetail.order.orderCode}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Khách hàng">
                    {dataDetail.order.user?.fullName ||
                      dataDetail.order.user?.username ||
                      "-"}
                  </Descriptions.Item>
                  <Descriptions.Item label="Trạng thái">
                    {statusMap[dataDetail.order.status]}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thanh toán">
                    {paymentStatusMap[dataDetail.order.paymentStatus]} (
                    {paymentMethodMap[dataDetail.order.paymentMethod]})
                  </Descriptions.Item>
                  <Descriptions.Item label="Mã vận đơn">
                    {dataDetail.order.trackingCode ? (
                      <Text strong copyable>
                        {dataDetail.order.trackingCode}
                      </Text>
                    ) : (
                      "-"
                    )}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tổng giá trị">
                    <Text
                      strong
                      style={{
                        color: "var(--primary-color)",
                        fontSize: "15px",
                      }}
                    >
                      {Number(dataDetail.order.finalPrice).toLocaleString(
                        "vi-VN",
                      )}
                      đ
                    </Text>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div style={{ borderTop: "1px dashed #f0f0f0", paddingTop: 16 }}>
                <div
                  style={{
                    fontWeight: 600,
                    color: "#262626",
                    marginBottom: 12,
                    fontSize: 14,
                  }}
                >
                  Thông tin giao hàng
                </div>
                <Descriptions
                  {...descriptionConfig}
                  labelStyle={{ width: 110 }}
                >
                  <Descriptions.Item label="Người nhận">
                    <Text strong>{dataDetail.order.receiverName}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">
                    <Text strong>{dataDetail.order.receiverPhone}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ">
                    <span
                      style={{
                        fontWeight: 400,
                        display: "block",
                        lineHeight: "1.5",
                      }}
                    >
                      {dataDetail.order.receiverAddress}
                    </span>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </BaseModal>
  );
}

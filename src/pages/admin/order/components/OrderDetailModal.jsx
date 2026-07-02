import {
  Descriptions,
  Empty,
  Table,
  Tag,
  Typography,
  Divider,
  Image,
  Card,
  Row,
  Col,
} from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import { formatDateTime } from "../../../../utils/formatDate.js";
import {
  statusMap,
  paymentStatusMap,
  paymentMethodMap,
  getStatusColor,
  getPaymentStatusColor,
} from "../../../../constants/order.js";
import OrderTimeline from "../../../../components/common/order/OrderTimeline";

const { Text } = Typography;

export default function OrderDetail({ dataDetail, openDetail, setOpenDetail }) {
  const handleClose = () => setOpenDetail(false);

  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "productName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Image
            src={record.thumbnail}
            width={45}
            height={45}
            style={{
              borderRadius: "var(--radius-sm, 6px)",
              objectFit: "cover",
            }}
          />
          <Text
            strong
            style={{ fontSize: "13px", color: "var(--text-main, #111)" }}
          >
            {text}
          </Text>
        </div>
      ),
    },
    { title: "SKU", dataIndex: "variantSku", align: "center" },
    { title: "SL", dataIndex: "quantity", align: "center", width: 60 },
    {
      title: "Đơn giá",
      dataIndex: "price",
      align: "right",
      render: (val) => `${Number(val).toLocaleString("vi-VN")}đ`,
    },
    {
      title: "Thành tiền",
      key: "totalPrice",
      align: "right",
      render: (_, record) =>
        `${Number(record.price * record.quantity).toLocaleString("vi-VN")}đ`,
    },
  ];

  return (
    <BaseModal
      open={openDetail}
      onCancel={handleClose}
      title="Chi tiết đơn hàng"
      footer={null}
      width={1150}
    >
      {!dataDetail ? (
        <Empty />
      ) : (
        <Row gutter={20}>
          <Col span={14}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card
                title="Thông tin sản phẩm & Thanh toán"
                size="small"
                style={{ borderRadius: "var(--radius-md, 10px)" }}
              >
                <Table
                  rowKey="id"
                  columns={columns}
                  dataSource={dataDetail.orderItems}
                  pagination={false}
                  size="middle"
                  className="custom-table-borderless"
                />

                <Divider style={{ margin: "20px 0 12px 0" }} />

                <Row justify="end">
                  <Col span={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary">Tạm tính:</Text>
                        <Text>
                          {Number(dataDetail.subtotal).toLocaleString("vi-VN")}đ
                        </Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary">Giảm giá:</Text>
                        <Text type="danger">
                          -
                          {Number(dataDetail.discountAmount).toLocaleString(
                            "vi-VN",
                          )}
                          đ
                        </Text>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text type="secondary">Phí vận chuyển:</Text>
                        <Text>
                          {Number(dataDetail.shippingFee).toLocaleString(
                            "vi-VN",
                          )}
                          đ
                        </Text>
                      </div>

                      <Divider style={{ margin: "4px 0" }} />

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Text strong>Tổng thanh toán:</Text>
                        <Text
                          strong
                          style={{
                            color: "var(--primary-color, #d70018)",
                            fontSize: "18px",
                          }}
                        >
                          {Number(dataDetail.finalPrice).toLocaleString(
                            "vi-VN",
                          )}
                          đ
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>

              {dataDetail.returnRequest && (
                <Card
                  title="Thông tin trả hàng / hoàn tiền"
                  size="small"
                  style={{ borderRadius: "var(--radius-md, 10px)" }}
                >
                  <Descriptions column={2} size="small" colon={false}>
                    <Descriptions.Item
                      label={<Text type="secondary">Trạng thái xử lý</Text>}
                    >
                      <Tag
                        color={
                          dataDetail.returnRequest.isApproved === null
                            ? "orange"
                            : dataDetail.returnRequest.isApproved
                              ? "green"
                              : "red"
                        }
                      >
                        {dataDetail.returnRequest.isApproved === null
                          ? "Chờ xử lý"
                          : dataDetail.returnRequest.isApproved
                            ? "Đã duyệt"
                            : "Từ chối"}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Số tiền hoàn</Text>}
                    >
                      <Text strong type="warning">
                        {dataDetail.returnRequest.refundAmount
                          ? `${Number(dataDetail.returnRequest.refundAmount).toLocaleString("vi-VN")}đ`
                          : "-"}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Ngày yêu cầu</Text>}
                    >
                      {formatDateTime(dataDetail.returnRequest.createdAt)}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Ngày xử lý</Text>}
                    >
                      {dataDetail.returnRequest.resolvedAt
                        ? formatDateTime(dataDetail.returnRequest.resolvedAt)
                        : "-"}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Lý do hoàn trả</Text>}
                      span={2}
                    >
                      {dataDetail.returnRequest.reason}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Ghi chú khách</Text>}
                      span={2}
                    >
                      {dataDetail.returnRequest.note || "-"}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Ghi chú Admin</Text>}
                      span={2}
                    >
                      {dataDetail.returnRequest.adminNote || "-"}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              )}
            </div>
          </Col>

          <Col span={10}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card
                title="Thông tin đơn hàng"
                size="small"
                style={{ borderRadius: "var(--radius-md, 10px)" }}
              >
                <Descriptions column={1} size="small" colon={false}>
                  <Descriptions.Item
                    label={<Text type="secondary">Mã đơn</Text>}
                  >
                    <Text strong copyable>
                      {dataDetail.orderCode}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Trạng thái</Text>}
                  >
                    <Tag
                      color={getStatusColor(dataDetail.status)}
                      style={{ margin: 0 }}
                    >
                      {statusMap[dataDetail.status]}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Thanh toán</Text>}
                  >
                    <Tag
                      color={getPaymentStatusColor(dataDetail.paymentStatus)}
                      style={{ margin: 0 }}
                    >
                      {paymentStatusMap[dataDetail.paymentStatus]}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Phương thức</Text>}
                  >
                    {paymentMethodMap[dataDetail.paymentMethod]}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Mã vận đơn</Text>}
                  >
                    {dataDetail.trackingCode ? (
                      <Text copyable>{dataDetail.trackingCode}</Text>
                    ) : (
                      "-"
                    )}
                  </Descriptions.Item>
                </Descriptions>
              </Card>

              <Card
                title="Lịch sử đơn hàng"
                size="small"
                style={{ borderRadius: "var(--radius-md, 10px)" }}
              >
                <OrderTimeline order={dataDetail} />
              </Card>

              <Card
                title="Thông tin người nhận"
                size="small"
                style={{ borderRadius: "var(--radius-md, 10px)" }}
              >
                <Descriptions column={1} size="small" colon={false}>
                  <Descriptions.Item
                    label={<Text type="secondary">Khách hàng</Text>}
                  >
                    {dataDetail.receiverName}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Số điện thoại</Text>}
                  >
                    <Text copyable>{dataDetail.receiverPhone}</Text>
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={<Text type="secondary">Địa chỉ</Text>}
                  >
                    <span style={{ wordBreak: "break-word" }}>
                      {dataDetail.receiverAddress}
                    </span>
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: "12px 0" }} />
                <div>
                  <Text type="secondary">Ghi chú từ khách hàng:</Text>
                  <div
                    style={{
                      marginTop: 6,
                      padding: "8px 10px",
                      background: "var(--bg-badge-gray, #fafafa)",
                      borderRadius: "var(--radius-sm, 6px)",
                      minHeight: 40,
                    }}
                  >
                    {dataDetail.note || (
                      <Text italic type="secondary">
                        Không có ghi chú
                      </Text>
                    )}
                  </div>
                </div>
              </Card>

              {dataDetail.voucher && (
                <Card
                  title="Thông tin voucher áp dụng"
                  size="small"
                  style={{ borderRadius: "var(--radius-md, 10px)" }}
                >
                  <Descriptions column={1} size="small" colon={false}>
                    <Descriptions.Item
                      label={<Text type="secondary">Mã voucher</Text>}
                    >
                      <Tag color="gold">{dataDetail.voucher.code}</Tag>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Loại voucher</Text>}
                    >
                      {dataDetail.voucher.type === "PERCENT"
                        ? "Giảm theo %"
                        : "Giảm theo số tiền"}
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text type="secondary">Giá trị giảm</Text>}
                    >
                      {dataDetail.voucher.type === "PERCENT"
                        ? `${dataDetail.voucher.discount}%`
                        : `${Number(dataDetail.voucher.discount).toLocaleString("vi-VN")}đ`}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      )}
    </BaseModal>
  );
}

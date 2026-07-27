import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarCircleOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { formatDateTime } from "../../../utils/formatDate";
import "./orderTimeLine.css";

const { Text } = Typography;

export default function ReturnTimeline({
  returnRequest,
  withCard = true,
  variant = "user",
}) {
  if (!returnRequest) return null;

  const items = [
    {
      show: returnRequest.createdAt,
      title: "Đã gửi yêu cầu trả hàng",
      time: returnRequest.createdAt,
      icon: <RollbackOutlined />,
      bg: "#fff7e6",
      color: "#fa8c16",
    },

    {
      show: returnRequest.approvedAt,
      title: "Yêu cầu được chấp nhận",
      time: returnRequest.approvedAt,
      icon: <CheckCircleOutlined />,
      bg: "#f6ffed",
      color: "#52c41a",
    },

    {
      show: returnRequest.receivedAt,
      title: "Shop đã nhận hàng",
      time: returnRequest.receivedAt,
      icon: <CheckCircleOutlined />,
      bg: "#e6f4ff",
      color: "#1677ff",
    },

    {
      show: returnRequest.inspectingAt,
      title: "Đang kiểm tra sản phẩm",
      time: returnRequest.inspectingAt,
      icon: <ClockCircleOutlined />,
      bg: "#fffbe6",
      color: "#faad14",
    },

    {
      show: returnRequest.refundedAt,
      title: "Đã hoàn tiền",
      time: returnRequest.refundedAt,
      icon: <DollarCircleOutlined />,
      bg: "#f6ffed",
      color: "#52c41a",
      extra: returnRequest.refundAmount
        ? `Hoàn ${Number(returnRequest.refundAmount).toLocaleString("vi-VN")}đ`
        : undefined,
    },

    {
      show: returnRequest.rejectedAt,
      title: "Yêu cầu bị từ chối",
      time: returnRequest.rejectedAt,
      icon: <CloseCircleOutlined />,
      bg: "#fff1f0",
      color: "#ff4d4f",
      extra: returnRequest.adminNote,
      isDanger: true,
    },
  ].filter((item) => item.show);

  const timeline = (
    <div className={`return-timeline ${variant}`}>
      {items.map((item, index) => (
        <div className="timeline-item" key={index}>
          {index !== items.length - 1 && <div className="timeline-line" />}

          <div
            className="timeline-icon"
            style={{
              background: item.bg,
              color: item.color,
            }}
          >
            {item.icon}
          </div>

          <div className="timeline-content">
            <Text className="timeline-title">{item.title}</Text>

            <Text className="timeline-time">{formatDateTime(item.time)}</Text>

            {item.extra && (
              <Text
                className={`timeline-extra ${item.isDanger ? "danger" : ""}`}
              >
                {item.extra}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (!withCard) return timeline;

  return (
    <Card title="Theo dõi trả hàng" className="detail-card">
      {timeline}
    </Card>
  );
}

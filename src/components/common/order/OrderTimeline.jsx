import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Card, Typography } from "antd";
import { formatDateTime } from "../../../utils/formatDate";
import "./orderTimeLine.css";

const { Text } = Typography;

export default function OrderTimeline({
  order,
  withCard = true,
  variant = "user",
}) {
  const items = [
    {
      show: true,
      title: "Đặt hàng thành công",
      time: order.createdAt,
      icon: <CheckCircleOutlined />,
      bg: "#eaf3ff",
      color: "var(--blue-color)",
    },
    {
      show: order.confirmedAt,
      title: "Đã xác nhận",
      time: order.confirmedAt,
      icon: <CheckCircleOutlined />,
      bg: "#eaf8ef",
      color: "var(--color-success)",
    },
    {
      show: order.shippedAt,
      title: "Đang giao hàng",
      time: order.shippedAt,
      icon: <ClockCircleOutlined />,
      bg: "#fff7e6",
      color: "var(--color-warning)",
      extra: order.trackingCode && `Mã vận đơn: ${order.trackingCode}`,
    },
    {
      show: order.completedAt,
      title: "Đã giao thành công",
      time: order.completedAt,
      icon: <CheckCircleOutlined />,
      bg: "#eaf8ef",
      color: "var(--color-success)",
    },
    {
      show: order.cancelledAt,
      title: "Đơn hàng đã hủy",
      time: order.cancelledAt,
      icon: <CloseCircleOutlined />,
      bg: "#fff1f0",
      color: "var(--color-danger)",
      extra: order.cancelReason,
      isCancel: true,
    },
  ].filter((item) => item.show);

  const timeline = (
    <div className={`order-timeline ${variant}`}>
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
                className={`timeline-extra ${item.isCancel ? "danger" : ""}`}
              >
                {item.isCancel ? `Lý do: ${item.extra}` : item.extra}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (!withCard) return timeline;

  return (
    <Card title="Theo dõi đơn hàng" className="detail-card">
      {timeline}
    </Card>
  );
}

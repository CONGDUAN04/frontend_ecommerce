import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Typography } from "antd";
import { formatDateTime } from "../../../utils/formatDate";

const { Text } = Typography;

export default function OrderTimeline({ order }) {
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

  return (
    <div
      style={{
        fontFamily: "var(--font-family-base)",
        background: "var(--bg-white)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-md)",
        padding: "20px 16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
        overflowX: "auto",
        gap: "16px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            flex: 1,
            minWidth: "120px",
            position: "relative",
          }}
        >
          {/* Đường line nối giữa các node (ẩn ở item cuối cùng) */}
          {index !== items.length - 1 && (
            <div
              style={{
                position: "absolute",
                top: "17px",
                left: "calc(50% + 22px)",
                right: "calc(-50% + 22px)",
                height: "2px",
                background: "var(--border-color)",
                zIndex: 1,
              }}
            />
          )}

          {/* Vòng tròn Icon */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "var(--radius-round)",
              background: item.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: item.color,
              fontSize: "var(--font-size-md)",
              position: "relative",
              zIndex: 2,
              marginBottom: "8px",
            }}
          >
            {item.icon}
          </div>

          {/* Khối thông tin text bên dưới icon */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <Text
              style={{
                fontSize: "var(--font-size-xs)",
                fontWeight: 600,
                color: "var(--text-main)",
                lineHeight: "16px",
              }}
            >
              {item.title}
            </Text>

            <Text
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                lineHeight: "14px",
              }}
            >
              {formatDateTime(item.time)}
            </Text>

            {item.extra && (
              <Text
                style={{
                  fontSize: "11px",
                  color: item.isCancel
                    ? "var(--color-danger)"
                    : "var(--text-muted)",
                  marginTop: "2px",
                  lineHeight: "14px",
                }}
              >
                {item.isCancel ? `Lý do: ${item.extra}` : item.extra}
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

import { Calendar } from "lucide-react";
import { Tag } from "antd";
import { statusMap, getStatusColor } from "../../../../constants/order";

export default function OrderHeader({ orderCode, createdAt, status }) {
  return (
    <div className="order-card-header">
      <div>
        <h3>
          Mã đơn hàng: <span className="code-highlight">{orderCode}</span>
        </h3>

        <p className="order-date">
          <Calendar size={14} style={{ marginRight: 6 }} /> {/* Icon Lucide */}
          <span>Ngày đặt: </span>
          <span className="order-date-value">
            {new Date(createdAt).toLocaleString("vi-VN")}
          </span>
        </p>
      </div>

      <Tag color={getStatusColor(status)}>{statusMap[status]}</Tag>
    </div>
  );
}

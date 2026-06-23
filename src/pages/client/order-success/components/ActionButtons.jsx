import { useNavigate } from "react-router-dom";
import { ShoppingOutlined, ArrowRightOutlined } from "@ant-design/icons";

export default function ActionButtons() {
  const navigate = useNavigate();

  return (
    <div className="success-actions">
      <button
        className="btn-primary"
        onClick={() => navigate("/my-orders")} // Trỏ về trang danh sách đơn hàng cá nhân
      >
        <span>Xem đơn hàng của tôi</span>
        <ArrowRightOutlined className="btn-icon" />
      </button>

      <button
        className="btn-outline"
        onClick={() => navigate("/")} // Trỏ về trang chủ tiếp tục mua sắm
      >
        <ShoppingOutlined className="btn-icon" />
        <span>Tiếp tục mua hàng</span>
      </button>
    </div>
  );
}

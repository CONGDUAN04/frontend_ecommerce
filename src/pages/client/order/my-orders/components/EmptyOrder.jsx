import { Button } from "antd";
import { useNavigate } from "react-router-dom";

export default function EmptyOrder() {
  const navigate = useNavigate();

  return (
    <div className="empty-order">
      <h3>Bạn chưa có đơn hàng nào</h3>

      <Button type="primary" onClick={() => navigate("/")}>
        Mua sắm ngay
      </Button>
    </div>
  );
}

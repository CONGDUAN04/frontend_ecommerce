import { Card } from "antd";

export default function OrderItems({ items = [] }) {
  return (
    <Card title={`Sản phẩm (${items.length})`} className="detail-card">
      {items.map((item) => (
        <div key={item.id} className="order-item">
          <img
            src={item.thumbnail}
            alt={item.productName}
            className="item-image"
          />

          <div className="item-info">
            <h4>{item.productName}</h4>

            <p>Màu sắc: {item.variantColor || "-"}</p>

            <p>Dung lượng: {item.variantStorage || "-"}</p>

            <p>SKU: {item.variantSku}</p>

            <p>Số lượng: {item.quantity}</p>
          </div>

          <div className="item-price">
            {item.price.toLocaleString("vi-VN")}₫
          </div>
        </div>
      ))}
    </Card>
  );
}

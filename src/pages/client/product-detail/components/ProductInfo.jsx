import { Star } from "lucide-react";

export default function ProductInfo({ product, displayedProductName }) {
  return (
    <>
      <div className="brand-badge-row">
        <span className="brand-tag">{product.brand.name}</span>

        <span className="sku-tag">Chính hãng độc quyền</span>
      </div>

      <h1 className="main-product-title">{displayedProductName}</h1>

      <div className="meta-feedback-line">
        <div className="stars-indicator">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={15}
              fill={
                i <= Math.round(product.rating.average) ? "#fbbf24" : "none"
              }
              color={
                i <= Math.round(product.rating.average) ? "#fbbf24" : "#d1d5db"
              }
            />
          ))}

          <span className="rating-score-num">
            {product.rating.average || "5.0"}
          </span>
        </div>

        <span className="divider-dot">•</span>

        <span className="feedback-count-text">
          {product.reviewCount} Đánh giá
        </span>
      </div>

      <div className="inventory-status-bar">
        <div className="pulse-dot-online" />
        <span className="status-message">Sẵn hàng tại chi nhánh gần nhất</span>
      </div>
    </>
  );
}

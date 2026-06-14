import { ShoppingCart, Heart } from "lucide-react";

export default function ProductActions({
  selectedVariant,
  isWishlist,
  setIsWishlist,
}) {
  return (
    <div className="action-buttons-cluster">
      <button
        type="button"
        className="cta-action-btn cta-primary-buy"
        disabled={!selectedVariant}
      >
        <strong>MUA NGAY CHÍNH HÃNG</strong>

        <span>Giao tận nhà siêu tốc hoặc nhận tại shop</span>
      </button>

      <div className="cta-sub-group">
        <button
          type="button"
          className="cta-action-btn cta-secondary-cart"
          disabled={!selectedVariant}
        >
          <ShoppingCart size={18} />

          <span>Thêm vào giỏ hàng</span>
        </button>

        <button
          type="button"
          className={`wishlist-toggle-btn ${isWishlist ? "active" : ""}`}
          onClick={() => setIsWishlist(!isWishlist)}
        >
          <Heart
            size={20}
            fill={isWishlist ? "var(--primary-color)" : "none"}
          />
        </button>
      </div>

      <div className="product-promotions-box">
        <div className="product-promotions-title">
          🎁 KHUYẾN MÃI CÒN HIỆU LỰC
        </div>

        <ul className="product-promotions-list">
          <li>Tặng gói bảo hành VIP Kim Cương trị giá 1.200.000đ.</li>

          <li>Giảm thêm 500.000đ khi tham gia Thu cũ đổi mới lên đời.</li>

          <li>Tặng voucher giảm 10% khi mua kèm phụ kiện bao da, ốp lưng.</li>
        </ul>
      </div>
    </div>
  );
}

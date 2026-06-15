import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/hook/useCart";
import { useContext } from "react";
import { CartContext } from "../../../../contexts/cart.context";
export default function ProductActions({
  selectedVariant,
  isWishlist,
  setIsWishlist,
}) {
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { fetchCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  // Thêm vào giỏ hàng
  const handleAddToCart = async () => {
    if (!selectedVariant || loading) return;

    try {
      setLoading(true);
      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
      });
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  // Mua ngay
  const handleBuyNow = async () => {
    if (!selectedVariant || loading) return;

    try {
      setLoading(true);

      await addToCart({
        variantId: selectedVariant.id,
        quantity: 1,
      });
      await fetchCart();
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="action-buttons-cluster">
      {/* Mua ngay */}
      <button
        type="button"
        className="cta-action-btn cta-primary-buy"
        disabled={!selectedVariant || loading}
        onClick={handleBuyNow}
      >
        <strong>{loading ? "ĐANG XỬ LÝ..." : "MUA NGAY CHÍNH HÃNG"}</strong>

        <span>Giao tận nhà siêu tốc hoặc nhận tại shop</span>
      </button>

      {/* Thêm vào giỏ + Wishlist */}
      <div className="cta-sub-group">
        <button
          type="button"
          className="cta-action-btn cta-secondary-cart"
          disabled={!selectedVariant || loading}
          onClick={handleAddToCart}
        >
          <ShoppingCart size={18} />

          <span>{loading ? "Đang thêm..." : "Thêm vào giỏ hàng"}</span>
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

      {/* Khuyến mãi */}
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

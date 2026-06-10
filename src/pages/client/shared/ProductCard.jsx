import { Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const {
    badges,
    rating,
    price,
    comparePrice,
    flashPrice,
    thumbnail,
    name,
    slug,
  } = product;

  const displayPrice = flashPrice || price;

  const formatPrice = (value) => {
    return Number(value || 0).toLocaleString("vi-VN") + "đ";
  };

  return (
    <div className="product-card" onClick={() => navigate(`/product/${slug}`)}>
      {badges?.discountPercent > 0 && (
        <div className="badge-discount">Giảm {badges.discountPercent}%</div>
      )}

      {badges?.isInstallment && (
        <div className="badge-installment">Trả góp 0%</div>
      )}

      <div className="card-img-wrap">
        <img
          src={thumbnail}
          alt={name}
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="card-body">
        <p className="card-name">{name}</p>

        <div className="card-price-row">
          <span className="card-price">{formatPrice(displayPrice)}</span>
          {comparePrice > displayPrice && (
            <span className="card-compare">{formatPrice(comparePrice)}</span>
          )}
        </div>

        {comparePrice > displayPrice ? (
          <div className="card-smember">
            Smember giảm đến{" "}
            {formatPrice(Math.round((comparePrice - displayPrice) * 0.01))}
          </div>
        ) : (
          <div className="card-installment">Bảo hành 12 tháng chính hãng</div>
        )}

        <div className="card-footer">
          <div className="card-rating">
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{rating?.average > 0 ? rating.average : "5.0"}</span>
          </div>

          <button
            className="card-wishlist"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart size={14} />
            <span>Yêu thích</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

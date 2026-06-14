export default function ProductPrice({ selectedVariant, formatPrice }) {
  if (!selectedVariant) {
    return (
      <div className="pricing-showcase-box">
        <span
          className="current-deal-price"
          style={{
            fontSize: "18px",
            color: "#6b7280",
          }}
        >
          Cấu hình này hiện đang hết hàng
        </span>
      </div>
    );
  }

  return (
    <div className="pricing-showcase-box">
      <div className="price-primary-row">
        <span className="current-deal-price">
          {formatPrice(selectedVariant.flashPrice || selectedVariant.price)}
        </span>

        {selectedVariant.comparePrice >
          (selectedVariant.flashPrice || selectedVariant.price) && (
          <span className="discount-tag-bubble">
            Giảm{" "}
            {Math.round(
              ((selectedVariant.comparePrice -
                (selectedVariant.flashPrice || selectedVariant.price)) /
                selectedVariant.comparePrice) *
                100,
            )}
            %
          </span>
        )}
      </div>

      {selectedVariant.comparePrice >
        (selectedVariant.flashPrice || selectedVariant.price) && (
        <div className="original-strike-row">
          Giá niêm yết:
          <span className="strike-amount">
            {formatPrice(selectedVariant.comparePrice)}
          </span>
        </div>
      )}
    </div>
  );
}

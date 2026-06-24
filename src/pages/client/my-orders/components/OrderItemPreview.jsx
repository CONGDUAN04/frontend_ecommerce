export default function OrderItemPreview({ item, totalItems, onClick }) {
  if (!item) return null;

  return (
    <div className="order-card-item-preview" onClick={onClick}>
      <img
        src={item.thumbnail}
        alt={item.productName}
        className="item-thumbnail"
      />

      <div className="item-info">
        <h4 className="item-name">{item.productName}</h4>

        <div className="item-meta-row">
          {item.variantColor && (
            <span className="badge-variant">{item.variantColor}</span>
          )}

          {item.variantStorage && (
            <span className="badge-variant">{item.variantStorage}</span>
          )}

          <span className="item-quantity">x {item.quantity}</span>
        </div>

        {totalItems > 1 && (
          <div className="other-items">
            Xem thêm {totalItems - 1} sản phẩm khác...
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductSpecifications({ product }) {
  return (
    <div className="product-info-block specs-equal-block">
      <h3 className="block-main-heading">Cấu hình chi tiết</h3>

      {product.specifications?.length ? (
        <div className="specifications-scroll-container">
          <div className="specifications-table-box">
            {product.specifications.map((spec) => (
              <div key={spec.id} className="specification-table-row">
                <div className="spec-label-cell">{spec.name}</div>

                <div className="spec-value-cell">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-state-notice">Thông số chưa cập nhật.</div>
      )}
    </div>
  );
}

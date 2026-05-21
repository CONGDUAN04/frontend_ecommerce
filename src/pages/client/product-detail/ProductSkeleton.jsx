const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="skeleton skeleton-image"></div>

      <div className="card-body">
        <div className="skeleton skeleton-title"></div>

        <div className="skeleton skeleton-price"></div>

        <div className="skeleton skeleton-text"></div>

        <div className="skeleton skeleton-footer"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

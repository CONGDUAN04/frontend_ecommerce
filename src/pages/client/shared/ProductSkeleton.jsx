import "../../../styles/client/components/product-card.css";

const ProductSkeleton = () => {
  return (
    <div className="product-card skeleton-card">
      <div className="card-img-wrap">
        <div className="skeleton skeleton-image"></div>
      </div>
      <div className="card-body">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="card-footer">
          <div className="skeleton skeleton-footer-left"></div>
          <div className="skeleton skeleton-footer-right"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

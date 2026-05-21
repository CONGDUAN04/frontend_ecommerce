import ProductCard from "./ProductCard";
import ProductSkeleton from "./ProductSkeleton";

const ProductSection = ({ title, tabs, products, loading }) => {
  return (
    <section className="product-section">
      <div className="section-header">
        <h2>{title}</h2>

        <button className="view-all-btn">Xem tất cả</button>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <span key={tab}>{tab}</span>
        ))}
      </div>

      <div className="product-row">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : products
              .slice(0, 10)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
      </div>
    </section>
  );
};

export default ProductSection;

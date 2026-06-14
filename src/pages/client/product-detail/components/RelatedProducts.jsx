export default function RelatedProducts({ products, navigate, formatPrice }) {
  if (!products?.length) {
    return null;
  }

  return (
    <div className="product-info-block related-products-section">
      <h3 className="block-main-heading">Sản phẩm tương tự phù hợp</h3>

      <div className="related-cards-responsive-grid">
        {products.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/product/${item.slug}`)}
            className="related-item-commercial-card"
          >
            <div className="thumbnail-bounding-box">
              <img src={item.thumbnail} alt={item.name} />
            </div>

            <div className="commercial-card-details">
              <h4 className="commercial-card-title">{item.name}</h4>

              <div className="commercial-card-price-tag">
                {formatPrice(item.flashPrice || item.price)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

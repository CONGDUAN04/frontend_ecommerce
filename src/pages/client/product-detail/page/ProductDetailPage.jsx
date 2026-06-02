import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetailAPI,
  getRelatedProductsAPI,
} from "../../../../services/client/api.product";
import "../../../../styles/client/pages/productDetail.css";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, relatedRes] = await Promise.all([
          getProductDetailAPI(slug),
          getRelatedProductsAPI(slug),
        ]);

        const productData = productRes.data;

        setProduct(productData);
        setRelatedProducts(relatedRes.data || []);

        if (productData.images?.length > 0) {
          setSelectedImage(productData.images[0].imageUrl);
        } else {
          setSelectedImage(productData.thumbnail);
        }

        if (productData.variants?.length > 0) {
          setSelectedColor(productData.variants[0].color);
          setSelectedStorage(productData.variants[0].storage);
        }
      } catch (error) {
        console.error("Load product failed:", error);
      }
    };

    if (slug) {
      loadData();
    }
  }, [slug]);

  const colors = useMemo(() => {
    if (!product) return [];
    const map = new Map();
    product.variants.forEach((variant) => {
      if (!map.has(variant.color)) {
        map.set(variant.color, {
          name: variant.color,
          code: variant.colorCode,
          image: variant.image,
        });
      }
    });
    return [...map.values()];
  }, [product]);

  const storages = useMemo(() => {
    if (!product) return [];
    return [...new Set(product.variants.map((v) => v.storage))];
  }, [product]);

  const selectedVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(
      (variant) =>
        variant.color === selectedColor && variant.storage === selectedStorage,
    );
  }, [product, selectedColor, selectedStorage]);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("vi-VN") + "đ";
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-[13px] text-gray-500">
        <div className="w-10 h-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        <span>Đang tải sản phẩm...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-white text-[14px] text-gray-900 product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          <div className="w-full">
            <div className="product-image-container">
              <img
                src={selectedImage || product.thumbnail}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="product-thumbnails">
              <button
                type="button"
                onClick={() => setSelectedImage(product.thumbnail)}
                className={`product-thumbnail-btn ${selectedImage === product.thumbnail ? "active" : ""}`}
              >
                <img
                  src={product.thumbnail}
                  alt=""
                  className="product-thumbnail-img"
                />
              </button>

              {product.images?.map((img) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`product-thumbnail-btn ${selectedImage === img.imageUrl ? "active" : ""}`}
                >
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="product-thumbnail-img"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="product-info-card">
            <div>
              <div className="product-brand">{product.brand.name}</div>
              <h1 className="product-title">{product.name}</h1>
              <div className="product-rating-wrapper">
                <div className="product-rating-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`product-rating-star ${
                        i <= Math.round(product.rating.average) ? "" : "empty"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span>{product.rating.average || 0}</span>
                <span>({product.reviewCount} đánh giá)</span>
              </div>
            </div>

            {selectedVariant && (
              <div className="product-price-wrapper">
                <span className="product-price">
                  {formatPrice(
                    selectedVariant.flashPrice || selectedVariant.price,
                  )}
                </span>
                {selectedVariant.comparePrice >
                  (selectedVariant.flashPrice || selectedVariant.price) && (
                  <>
                    <span className="product-compare-price">
                      {formatPrice(selectedVariant.comparePrice)}
                    </span>
                    <span className="product-discount-badge">
                      -
                      {Math.round(
                        ((selectedVariant.comparePrice -
                          (selectedVariant.flashPrice ||
                            selectedVariant.price)) /
                          selectedVariant.comparePrice) *
                          100,
                      )}
                      %
                    </span>
                  </>
                )}
              </div>
            )}

            {selectedVariant && (
              <div className="product-stock-wrapper">
                <span className="product-stock-indicator" />
                Còn hàng
              </div>
            )}

            <div className="product-color-section">
              <div className="product-section-title">Màu sắc</div>
              <div className="product-color-options">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.name);
                      if (color.image) setSelectedImage(color.image);
                    }}
                    className={`color-option-btn ${selectedColor === color.name ? "active" : ""}`}
                  >
                    <span
                      className="color-circle"
                      style={{
                        backgroundColor: color.code,
                      }}
                    />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-storage-section">
              <div className="product-section-title">Dung lượng</div>
              <div className="product-storage-options">
                {storages.map((storage) => (
                  <button
                    key={storage}
                    type="button"
                    onClick={() => setSelectedStorage(storage)}
                    className={`storage-option-btn ${selectedStorage === storage ? "active" : ""}`}
                  >
                    {selectedStorage === storage && (
                      <span className="storage-checkmark">✓</span>
                    )}
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-actions">
              <button type="button" className="product-actions-btn btn-buy-now">
                MUA NGAY
              </button>
              <button
                type="button"
                className="product-actions-btn btn-add-cart"
              >
                THÊM GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>

        <div className="product-section">
          <div className="section-header">
            <h2 className="section-title">Thông số kỹ thuật</h2>
          </div>
          {product.specifications?.length ? (
            <div className="specifications-card">
              <div className="specifications-grid">
                {product.specifications.map((spec) => (
                  <div key={spec.id} className="spec-row">
                    <div className="spec-name">{spec.name}</div>
                    <div className="spec-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="empty-specs">Chưa có thông số kỹ thuật.</div>
          )}
        </div>

        <div className="product-section">
          <div className="section-header">
            <h2 className="section-title">Mô tả sản phẩm</h2>
          </div>
          <p className="product-description">{product.description}</p>
        </div>

        <div className="product-section">
          <div className="section-header section-header-flex">
            <h2 className="section-title">Đánh giá khách hàng</h2>
            <span className="review-count-badge">{product.reviewCount}</span>
          </div>
          {product.reviews?.length > 0 ? (
            <div className="product-reviews-list">
              {product.reviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="review-avatar">
                      {review.user?.fullName?.[0] || "U"}
                    </div>
                    <div>
                      <div className="review-author">
                        {review.user?.fullName}
                      </div>
                      <div className="review-rating">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </div>
                    </div>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty-reviews">Chưa có đánh giá nào.</p>
          )}
        </div>

        {relatedProducts.length > 0 && (
          <div className="product-section">
            <div className="section-header">
              <h2 className="section-title">Sản phẩm liên quan</h2>
            </div>
            <div className="related-products-grid">
              {relatedProducts.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(`/product/${item.slug}`)}
                  className="related-product-card"
                >
                  <div className="related-product-image-wrapper">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="related-product-image"
                    />
                  </div>
                  <div className="related-product-info">
                    <h4 className="related-product-name">{item.name}</h4>
                    <div className="related-product-price">
                      {formatPrice(item.flashPrice || item.price)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

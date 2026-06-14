import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProductDetailAPI,
  getRelatedProductsAPI,
} from "../../../../services/client/api.product";
import "../../../../styles/client/pages/ProductDetailPage.css";
import ProductGallery from "../components//ProductGallery";
import ProductInfo from "../components//ProductInfo";
import ProductPrice from "../components//ProductPrice";
import ProductVariantSelector from "../components//ProductVariantSelector";
import ProductActions from "../components//ProductActions";
import ProductDescription from "../components//ProductDescription";
import ProductSpecifications from "../components//ProductSpecifications";
import ProductReviews from "../components//ProductReviews";
import RelatedProducts from "../components//RelatedProducts";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [isWishlist, setIsWishlist] = useState(false);

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
        console.error("Tải thông tin sản phẩm thất bại:", error);
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

  const displayedProductName = useMemo(() => {
    if (!product) return "";

    if (
      selectedStorage &&
      !product.name.toLowerCase().includes(selectedStorage.toLowerCase())
    ) {
      return `${product.name} ${selectedStorage}`;
    }

    return product.name;
  }, [product, selectedStorage]);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("vi-VN") + "đ";
  };

  if (!product) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner" />

        <span>Đang tối ưu cấu hình hiển thị sản phẩm...</span>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-container">
        <div className="product-detail-main-layout">
          <div className="layout-left-column">
            <ProductGallery
              product={product}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              displayedProductName={displayedProductName}
            />
          </div>

          <div className="layout-right-column">
            <ProductInfo
              product={product}
              displayedProductName={displayedProductName}
            />

            <ProductPrice
              selectedVariant={selectedVariant}
              formatPrice={formatPrice}
            />

            <ProductVariantSelector
              colors={colors}
              storages={storages}
              selectedColor={selectedColor}
              selectedStorage={selectedStorage}
              setSelectedColor={setSelectedColor}
              setSelectedStorage={setSelectedStorage}
              setSelectedImage={setSelectedImage}
              product={product}
            />

            <ProductActions
              selectedVariant={selectedVariant}
              isWishlist={isWishlist}
              setIsWishlist={setIsWishlist}
            />
          </div>
        </div>

        <div className="product-detail-content-section-split">
          <div className="content-split-pane-wrapper">
            <ProductDescription
              product={product}
              displayedProductName={displayedProductName}
            />
          </div>

          <div className="content-split-pane-wrapper">
            <ProductSpecifications product={product} />
          </div>
        </div>

        <div className="product-detail-bottom-layout">
          <ProductReviews product={product} />

          <RelatedProducts
            products={relatedProducts}
            navigate={navigate}
            formatPrice={formatPrice}
          />
        </div>
      </div>
    </div>
  );
}

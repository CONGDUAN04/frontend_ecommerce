import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import ProductSection from "../components/ProductSection";
import FlashSaleSection from "../components/FlashSaleSection";
import banner1 from "../../../../assets/banner1.jpg";
import banner2 from "../../../../assets/banner2.jpg";
import { getHomeProductsAPI } from "../../../../services/client/api.product";

import "../../../../styles/client/pages/homepage.css";

const HomePageUser = () => {
  const banners = [banner1, banner2];

  const [currentBanner, setCurrentBanner] = useState(0);

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await getHomeProductsAPI();

      console.log(res.data);

      setProducts(res.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Điện thoại
  const phoneProducts = products.filter(
    (p) => p.category?.slug === "dien-thoai",
  );

  // Laptop
  const laptopProducts = products.filter((p) => p.category?.slug === "laptop");

  // Flash sale
  const flashProducts = products.filter(
    (product) => product.badges?.isFlashSale,
  );

  return (
    <div className="homepage">
      <HeroSection
        banners={banners}
        currentBanner={currentBanner}
        setCurrentBanner={setCurrentBanner}
      />
      {flashProducts.length > 0 && (
        <FlashSaleSection products={flashProducts} />
      )}

      <ProductSection
        title="📱 ĐIỆN THOẠI"
        tabs={["iPhone", "Samsung", "Xiaomi", "OPPO"]}
        products={phoneProducts}
        loading={loading}
      />

      <ProductSection
        title="💻 LAPTOP"
        tabs={["MacBook", "Asus", "Dell", "Lenovo"]}
        products={laptopProducts}
        loading={loading}
      />
    </div>
  );
};

export default HomePageUser;

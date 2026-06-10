import {
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Monitor,
} from "lucide-react";

const HeroSection = ({ banners, currentBanner, setCurrentBanner }) => {
  const categories = [
    { icon: <Smartphone size={18} />, name: "Điện thoại" },
    { icon: <Laptop size={18} />, name: "Laptop" },
    { icon: <Tablet size={18} />, name: "Tablet" },
    { icon: <Watch size={18} />, name: "Đồng hồ" },
    { icon: <Headphones size={18} />, name: "Âm thanh" },
    { icon: <Monitor size={18} />, name: "Màn hình" },
  ];

  return (
    <section className="hero">
      <div className="hero-menu">
        {categories.map((item, index) => (
          <div key={index} className="menu-item">
            <div className="menu-left">
              {item.icon}
              <span>{item.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-banner">
        <img src={banners[currentBanner]} alt="banner quảng cáo" />

        <button
          className="banner-btn left"
          onClick={() =>
            setCurrentBanner(
              currentBanner === 0 ? banners.length - 1 : currentBanner - 1,
            )
          }
          aria-label="Previous banner"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          className="banner-btn right"
          onClick={() =>
            setCurrentBanner(
              currentBanner === banners.length - 1 ? 0 : currentBanner + 1,
            )
          }
          aria-label="Next banner"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;

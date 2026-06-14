import { Gift, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function ProductGallery({
  product,
  selectedImage,
  setSelectedImage,
  displayedProductName,
}) {
  return (
    <div className="media-presentation-box">
      <div className="product-image-stage">
        <img
          src={selectedImage || product.thumbnail}
          alt={displayedProductName}
          className="product-main-display"
        />
      </div>

      <div className="product-thumbnails-strip">
        <button
          type="button"
          onClick={() => setSelectedImage(product.thumbnail)}
          className={`thumb-item-btn ${
            selectedImage === product.thumbnail ? "active" : ""
          }`}
        >
          <img src={product.thumbnail} alt="Mặc định" />
        </button>

        {product.images?.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelectedImage(img.imageUrl)}
            className={`thumb-item-btn ${
              selectedImage === img.imageUrl ? "active" : ""
            }`}
          >
            <img src={img.imageUrl} alt="Biến thể" />
          </button>
        ))}
      </div>

      <div className="product-info-summary-box">
        <div className="summary-box-title">
          <Gift size={15} />
          <span>ĐẶC QUYỀN DỊCH VỤ KHÁCH HÀNG</span>
        </div>

        <div className="summary-grid">
          <div className="summary-item">
            <ShieldCheck size={18} className="summary-icon" />
            <div>
              <strong>Bảo hành chính hãng</strong>
              <span>12 tháng toàn quốc, lỗi 1 đổi 1 trong 30 ngày.</span>
            </div>
          </div>

          <div className="summary-item">
            <Truck size={18} className="summary-icon" />
            <div>
              <strong>Miễn phí vận chuyển</strong>
              <span>Giao nội thành trong 2H, miễn phí ship mọi đơn hàng.</span>
            </div>
          </div>

          <div className="summary-item">
            <RefreshCw size={18} className="summary-icon" />
            <div>
              <strong>Thu cũ đổi mới giá tốt</strong>
              <span>Trợ giá lên đời lên tới 95% giá trị máy cũ.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDescription({ product, displayedProductName }) {
  return (
    <div className="product-info-block description-equal-block">
      <h3 className="block-main-heading">Đặc điểm nổi bật sản phẩm</h3>

      <article className="product-rich-description">
        {product.description &&
        product.description.trim() !== "dfsfdsfdsfdsf" ? (
          product.description
        ) : (
          <div className="empty-content-placeholder">
            <p>
              Mô tả chi tiết sản phẩm <strong>{displayedProductName}</strong>{" "}
              đang được cập nhật.
            </p>

            <span>
              Trải nghiệm sức mạnh đỉnh cao từ hiệu năng chip xử lý tiên tiến,
              công nghệ hiển thị màn hình rực rỡ sắc nét và hệ thống camera bắt
              trọn mọi khoảnh khắc chân thực nhất.
            </span>
          </div>
        )}
      </article>
    </div>
  );
}

export default function ProductReviews({ product }) {
  return (
    <div className="product-info-block">
      <div className="heading-with-badge">
        <h3 className="block-main-heading">Phản hồi từ khách hàng</h3>

        <span className="badge-count-pill">{product.reviewCount}</span>
      </div>

      {product.reviews?.length > 0 ? (
        <div className="customer-reviews-timeline">
          {product.reviews.map((review) => (
            <div key={review.id} className="timeline-review-card">
              <div className="reviewer-profile">
                <div className="avatar-placeholder-box">
                  {review.user?.fullName?.[0] || "U"}
                </div>

                <div className="profile-text-meta">
                  <div className="reviewer-name">{review.user?.fullName}</div>

                  <div className="review-stars-row">
                    {"★".repeat(review.rating)}

                    <span className="empty-stars-grey">
                      {"☆".repeat(5 - review.rating)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="reviewer-text-content">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-reviews-state">
          Chưa có đánh giá nào cho sản phẩm này.
        </div>
      )}
    </div>
  );
}

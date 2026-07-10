export default function PaymentMethod({ paymentMethod, setPaymentMethod }) {
  const paymentOptions = [
    {
      id: "COD",
      label: "Thanh toán khi nhận hàng (COD)",
      desc: "Trả tiền mặt khi nhận hàng tại nhà",
      icon: "🚚",
    },
    {
      id: "BANKING",
      label: "Chuyển khoản ngân hàng",
      desc: "Chuyển khoản qua QR Code hoặc số tài khoản",
      icon: "💳",
    },
  ];

  return (
    <div className="checkout-section">
      <h3 className="section-title">
        <span>2</span> Phương thức thanh toán
      </h3>

      <div className="payment-methods-list">
        {paymentOptions.map((option) => (
          <label
            key={option.id}
            className={`payment-item ${
              paymentMethod === option.id ? "active" : ""
            }`}
          >
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === option.id}
              onChange={() => setPaymentMethod(option.id)}
            />

            <span className="payment-icon">{option.icon}</span>

            <div className="payment-info">
              <span className="payment-label">{option.label}</span>
              <span className="payment-desc">{option.desc}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

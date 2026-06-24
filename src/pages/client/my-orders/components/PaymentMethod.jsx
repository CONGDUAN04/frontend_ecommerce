import { paymentIconMap, paymentMethodMap } from "../../../../constants/order";

export default function PaymentMethod({ paymentMethod }) {
  return (
    <div className="payment-method-block">
      {paymentIconMap[paymentMethod] && (
        <img
          src={paymentIconMap[paymentMethod]}
          alt={paymentMethod}
          className={`payment-logo logo-${paymentMethod.toLowerCase()}`}
        />
      )}

      <span className="method-name">{paymentMethodMap[paymentMethod]}</span>
    </div>
  );
}

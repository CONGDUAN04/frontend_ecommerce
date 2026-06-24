import {
  paymentStatusMap,
  getPaymentStatusColor,
} from "../../../../constants/order";

export default function PaymentStatus({ status }) {
  return (
    <span
      className="payment-status-dot"
      style={{
        "--dot-color": getPaymentStatusColor(status),
      }}
    >
      {paymentStatusMap[status]}
    </span>
  );
}

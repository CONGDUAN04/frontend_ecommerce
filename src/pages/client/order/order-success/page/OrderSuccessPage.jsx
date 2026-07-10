import { useLocation } from "react-router-dom";
import SuccessCard from "../components/SuccessCard";
import ActionButtons from "../components/ActionButtons";

import "../../../../../styles/client/pages/OrderSuccessPage.css";

export default function OrderSuccessPage() {
  const location = useLocation();

  const orderData = {
    orderCode: location.state?.orderCode || "N/A",
    finalPrice: location.state?.finalPrice || 0,
    paymentMethod: location.state?.paymentMethod || "COD",
  };

  return (
    <div className="order-success-page">
      <div className="order-success-wrapper">
        <SuccessCard orderData={orderData} />
        <ActionButtons />
      </div>
    </div>
  );
}

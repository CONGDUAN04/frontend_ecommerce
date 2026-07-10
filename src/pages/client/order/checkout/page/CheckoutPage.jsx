import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "antd";
import { CartContext } from "../../../../../contexts/cart.context";
import ShippingInfo from "../components/ShippingInfo";
import PaymentMethod from "../components/PaymentMethod";
import OrderNote from "../components/OrderNote";
import OrderSummary from "../components/OrderSummary";

import "../../../../../styles/client/pages/CheckoutPage.css";
import { useOrder } from "../../hooks/useOrder";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const { createOrder } = useOrder();

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const handlePlaceOrder = async (values) => {
    setLoading(true);

    try {
      const res = await createOrder(
        {
          receiverName: values.receiverName,
          receiverPhone: values.receiverPhone,
          receiverAddress: values.receiverAddress,
          note: values.note,
          paymentMethod,
        },
        form,
      );

      if (res?.data?.id) {
        navigate("/order-success", {
          state: {
            orderCode: res.data.orderCode,
            finalPrice: res.data.finalPrice,
            paymentMethod: res.data.paymentMethod,
          },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handlePlaceOrder}>
      <div className="checkout-container">
        <h1 className="checkout-title">Thanh toán đơn hàng</h1>

        <div className="checkout-layout">
          <div className="checkout-left">
            <ShippingInfo />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

            <OrderNote />
          </div>

          <OrderSummary cart={cart} loading={loading} onSubmit={form.submit} />
        </div>
      </div>
    </Form>
  );
}

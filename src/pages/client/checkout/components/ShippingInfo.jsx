import { Form, Input } from "antd";

const { TextArea } = Input;

export default function ShippingInfo() {
  return (
    <div className="checkout-section">
      <h3 className="section-title">
        <span>1</span> Thông tin nhận hàng
      </h3>

      <div className="address-form-grid">
        <Form.Item
          className="form-group"
          label="Họ và tên"
          name="receiverName"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập họ tên người nhận",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập họ tên người nhận" />
        </Form.Item>

        <Form.Item
          className="form-group"
          label="Số điện thoại"
          name="receiverPhone"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số điện thoại",
            },
            {
              pattern: /^(0|\+84)[0-9]{9,10}$/,
              message: "Số điện thoại không hợp lệ",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập số điện thoại" maxLength={11} />
        </Form.Item>

        <Form.Item
          className="form-group full-width"
          label="Địa chỉ giao hàng"
          name="receiverAddress"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập địa chỉ giao hàng",
            },
          ]}
        >
          <TextArea
            rows={2}
            placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
          />
        </Form.Item>
      </div>
    </div>
  );
}

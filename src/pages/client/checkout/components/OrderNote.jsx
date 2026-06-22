import { Form, Input } from "antd";

const { TextArea } = Input;

export default function OrderNote() {
  return (
    <div className="checkout-section">
      <h3 className="section-title">
        <span>3</span> Ghi chú đơn hàng
      </h3>

      <Form.Item
        name="note"
        rules={[
          {
            max: 255,
            message: "Ghi chú không được vượt quá 255 ký tự",
          },
        ]}
      >
        <TextArea rows={3} placeholder="Lưu ý cho người bán hoặc shipper..." />
      </Form.Item>
    </div>
  );
}

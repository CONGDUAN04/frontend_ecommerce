import { Modal, Form, Select, Input } from "antd";

const { TextArea } = Input;

export default function CancelOrderModal({
  open,
  form,
  loading,
  onCancel,
  onConfirm,
}) {
  return (
    <Modal
      title="Hủy đơn hàng"
      open={open}
      onOk={onConfirm}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Hủy đơn"
      cancelText="Đóng"
      okButtonProps={{ danger: true }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Lý do hủy"
          name="cancelReason"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn lý do",
            },
          ]}
        >
          <Select
            placeholder="Chọn lý do hủy đơn"
            options={[
              { value: "Đổi ý không muốn mua nữa" },
              { value: "Đặt nhầm sản phẩm" },
              { value: "Muốn thay đổi sản phẩm" },
              { value: "Thời gian giao hàng quá lâu" },
              { value: "Khác" },
            ]}
          />
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(p, c) => p.cancelReason !== c.cancelReason}
        >
          {({ getFieldValue }) =>
            getFieldValue("cancelReason") === "Khác" ? (
              <Form.Item
                name="customReason"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lý do hủy đơn hàng",
                  },
                  {
                    min: 5,
                    message: "Lý do phải có ít nhất 5 ký tự",
                  },
                  {
                    max: 255,
                    message: "Lý do không được vượt quá 255 ký tự",
                  },
                ]}
              >
                <TextArea rows={2} placeholder="Nhập lý do hủy đơn hàng" />
              </Form.Item>
            ) : null
          }
        </Form.Item>
      </Form>
    </Modal>
  );
}

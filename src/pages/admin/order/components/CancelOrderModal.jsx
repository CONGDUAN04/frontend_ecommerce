import { Form, Input, Modal } from "antd";

export default function CancelOrderModal({ open, setOpen, loading, onSubmit }) {
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();

    const success = await onSubmit(values);

    if (success) {
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Huỷ đơn hàng"
      onOk={handleOk}
      onCancel={() => {
        form.resetFields();
        setOpen(false);
      }}
      confirmLoading={loading}
      okText="Huỷ đơn"
      okButtonProps={{ danger: true }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Lý do huỷ"
          name="cancelReason"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập lý do",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

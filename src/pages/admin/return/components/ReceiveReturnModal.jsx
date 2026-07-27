import { Form, Input, Alert } from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal";

const { TextArea } = Input;

export default function ReceiveReturnModal({
  open,
  setOpen,
  loading,
  onSubmit,
}) {
  const [form] = Form.useForm();

  const handleClose = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleFinish = async (values) => {
    const success = await onSubmit(values);

    if (!success) return;

    form.resetFields();
    setOpen(false);
  };

  return (
    <BaseModal
      open={open}
      title="Xác nhận đã nhận sản phẩm"
      okText="Xác nhận nhận hàng"
      cancelText="Đóng"
      confirmLoading={loading}
      okButtonProps={{
        disabled: loading,
      }}
      cancelButtonProps={{
        disabled: loading,
      }}
      destroyOnHidden
      maskClosable={false}
      keyboard={!loading}
      onCancel={handleClose}
      onOk={() => form.submit()}
    >
      <Alert
        type="info"
        showIcon
        style={{ marginBottom: 20 }}
        message="Xác nhận đã nhận hàng"
        description="Sau khi xác nhận, yêu cầu sẽ chuyển sang trạng thái 'Đã nhận hàng'. Tiếp theo kỹ thuật viên sẽ kiểm tra sản phẩm trước khi quyết định hoàn tiền."
      />

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Ghi chú"
          name="adminNote"
          extra="Ví dụ: Đã nhận đầy đủ sản phẩm và phụ kiện từ khách."
          rules={[
            {
              max: 500,
              message: "Ghi chú tối đa 500 ký tự.",
            },
          ]}
        >
          <TextArea
            rows={5}
            showCount
            maxLength={500}
            allowClear
            placeholder="Ví dụ: Đã nhận đầy đủ sản phẩm, chuyển bộ phận kỹ thuật kiểm tra."
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

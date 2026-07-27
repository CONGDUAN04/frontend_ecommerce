import { Alert, Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";

const { TextArea } = Input;

export default function RejectReturnModal({
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
      title="Từ chối yêu cầu trả hàng"
      okText="Xác nhận từ chối"
      cancelText="Đóng"
      confirmLoading={loading}
      okButtonProps={{
        danger: true,
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
        type="warning"
        showIcon
        style={{ marginBottom: 20 }}
        message="Lưu ý"
        description="Sau khi từ chối, yêu cầu trả hàng sẽ kết thúc và đơn hàng sẽ quay về trạng thái Hoàn thành. Khách hàng sẽ nhận được thông báo kèm lý do từ chối."
      />

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Lý do từ chối"
          name="adminNote"
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Vui lòng nhập lý do từ chối.",
            },
            {
              min: 10,
              message: "Lý do phải có ít nhất 10 ký tự.",
            },
            {
              max: 500,
              message: "Lý do tối đa 500 ký tự.",
            },
          ]}
          extra="Khách hàng sẽ nhìn thấy nội dung này."
        >
          <TextArea
            rows={5}
            showCount
            allowClear
            maxLength={500}
            placeholder="Ví dụ: Sản phẩm không còn nguyên trạng, quá thời hạn đổi trả hoặc không đáp ứng chính sách hoàn trả của cửa hàng."
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

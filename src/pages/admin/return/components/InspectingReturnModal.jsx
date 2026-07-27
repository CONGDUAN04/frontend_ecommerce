import { Alert, Form, Input } from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal";

const { TextArea } = Input;

export default function InspectingReturnModal({
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
      title="Bắt đầu kiểm tra sản phẩm"
      okText="Bắt đầu kiểm tra"
      cancelText="Đóng"
      confirmLoading={loading}
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
        message="Kiểm tra sản phẩm"
        description="Sau khi xác nhận, yêu cầu sẽ chuyển sang trạng thái 'Đang kiểm tra'. Kỹ thuật viên sẽ kiểm tra ngoại hình, phụ kiện và tình trạng hoạt động của sản phẩm trước khi quyết định hoàn tiền."
      />

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Ghi chú kiểm tra"
          name="adminNote"
          extra="Không bắt buộc. Ghi chú này giúp lưu lại quá trình kiểm tra."
          rules={[
            {
              max: 500,
              message: "Tối đa 500 ký tự.",
            },
          ]}
        >
          <TextArea
            rows={5}
            showCount
            maxLength={500}
            allowClear
            placeholder="Ví dụ: Đang kiểm tra ngoại hình, IMEI, màn hình, pin và các chức năng của sản phẩm."
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

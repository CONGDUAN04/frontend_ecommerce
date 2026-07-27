import { useEffect } from "react";
import { Alert, Descriptions, Form, Input, Typography } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";

const { TextArea } = Input;
const { Text } = Typography;

export default function ApproveReturnModal({
  open,
  setOpen,
  loading,
  onSubmit,
  order,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open, form]);

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const handleFinish = async (values) => {
    const success = await onSubmit(values);

    if (success) {
      form.resetFields();
      setOpen(false);
    }
  };

  return (
    <BaseModal
      open={open}
      width={560}
      title="Duyệt yêu cầu trả hàng"
      okText="Duyệt"
      cancelText="Hủy"
      confirmLoading={loading}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      destroyOnHidden
      maskClosable={false}
      keyboard={false}
    >
      {order && (
        <>
          <Descriptions
            bordered
            size="small"
            column={1}
            style={{ marginBottom: 16 }}
          >
            <Descriptions.Item label="Mã đơn">
              <Text copyable>{order.orderCode}</Text>
            </Descriptions.Item>

            <Descriptions.Item label="Khách hàng">
              {order.receiverName}
            </Descriptions.Item>

            <Descriptions.Item label="Tổng giá trị">
              <Text strong style={{ color: "#1677ff", fontSize: 16 }}>
                {Number(order.finalPrice).toLocaleString("vi-VN")}đ
              </Text>
            </Descriptions.Item>
          </Descriptions>

          <Alert
            showIcon
            type="info"
            style={{ marginBottom: 20 }}
            message="Sau khi duyệt, khách hàng sẽ được thông báo gửi sản phẩm về cửa hàng để kiểm tra trước khi hoàn tiền."
          />
        </>
      )}

      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        onFinish={handleFinish}
      >
        <Form.Item
          label="Ghi chú phê duyệt"
          name="adminNote"
          extra="Không bắt buộc. Nội dung sẽ được lưu để đối chiếu khi xử lý hoàn trả."
        >
          <TextArea
            rows={4}
            showCount
            maxLength={500}
            placeholder="Ví dụ: Sản phẩm đủ điều kiện hoàn trả. Vui lòng gửi đầy đủ phụ kiện và hóa đơn."
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

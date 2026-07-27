import { useEffect } from "react";
import {
  Alert,
  Descriptions,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";

const { TextArea } = Input;
const { Text } = Typography;

export default function CompleteReturnModal({
  open,
  setOpen,
  loading,
  onSubmit,
  order,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && order) {
      form.setFieldsValue({
        refundAmount: order.finalPrice,
      });
    } else {
      form.resetFields();
    }
  }, [open, order, form]);

  const handleCancel = () => {
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
      width={620}
      title="Hoàn tiền cho khách hàng"
      okText="Xác nhận hoàn tiền"
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

            <Descriptions.Item label="Giá trị đơn hàng">
              <Text strong style={{ color: "#1677ff", fontSize: 16 }}>
                {Number(order.finalPrice).toLocaleString("vi-VN")}đ
              </Text>
            </Descriptions.Item>
          </Descriptions>

          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 20 }}
            message="Hoàn tiền thủ công"
            description="Website không tự động chuyển tiền. Hãy hoàn tiền cho khách trước bằng phương thức phù hợp, sau đó xác nhận để lưu lịch sử hoàn tiền."
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
          label="Số tiền hoàn"
          name="refundAmount"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số tiền hoàn.",
            },
            {
              type: "number",
              min: 1,
              message: "Số tiền phải lớn hơn 0.",
            },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            precision={0}
            formatter={(value) =>
              value
                ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                : ""
            }
            parser={(value) => value?.replace(/,/g, "")}
            addonAfter="VNĐ"
          />
        </Form.Item>

        <Form.Item
          label="Phương thức hoàn tiền"
          name="refundMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phương thức hoàn tiền.",
            },
          ]}
        >
          <Select
            options={[
              {
                label: "Tiền mặt tại cửa hàng",
                value: "CASH",
              },
              {
                label: "Chuyển khoản ngân hàng",
                value: "BANKING",
              },
              {
                label: "MoMo",
                value: "MOMO",
              },
              {
                label: "VNPay",
                value: "VNPAY",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Thông tin tài khoản / ngân hàng" name="refundBank">
          <Input
            maxLength={200}
            placeholder="Ví dụ: Vietcombank - 0123456789 - Nguyễn Văn A"
          />
        </Form.Item>

        <Form.Item
          label="Ghi chú hoàn tiền"
          name="refundNote"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ghi chú.",
            },
          ]}
        >
          <TextArea
            rows={4}
            showCount
            maxLength={500}
            placeholder="Ví dụ: Đã hoàn tiền cho khách qua chuyển khoản ngân hàng."
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

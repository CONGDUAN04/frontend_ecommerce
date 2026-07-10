/* eslint-disable react-hooks/rules-of-hooks */
import { Modal, Form, Input, Select, Checkbox, InputNumber, Alert } from "antd";
import { useEffect } from "react";
import { warningToast } from "../../../../../components/ui/toast";
const { TextArea } = Input;

const reasons = [
  { label: "Sản phẩm bị lỗi", value: "DEFECTIVE" },
  { label: "Giao sai sản phẩm", value: "WRONG_PRODUCT" },
  { label: "Không đúng mô tả", value: "NOT_AS_DESCRIBED" },
  { label: "Không còn nhu cầu", value: "CHANGED_MIND" },
  { label: "Khác", value: "OTHER" },
];

export default function ReturnRequestModal({
  open,
  form,
  order,
  loading,
  onCancel,
  onConfirm,
}) {
  useEffect(() => {
    if (!open || !order) return;

    form.resetFields();

    form.setFieldsValue({
      reason: undefined,
      note: "",
      items: order.orderItems.map(() => ({
        selected: false,
        quantity: 1,
        reason: "",
      })),
    });
  }, [open, order, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const items = (values.items || [])
        .map((item, index) => ({
          selected: item.selected,
          orderItemId: order.orderItems[index].id,
          quantity: item.quantity,
          reason: item.reason,
        }))
        .filter((item) => item.selected)
        .map(({ selected, ...rest }) => rest);

      if (!items.length) {
        warningToast("Vui lòng chọn ít nhất một sản phẩm.");
        return;
      }

      await onConfirm({
        reason: values.reason,
        note: values.note,
        items,
      });
    } catch (err) {
      // validate form
    }
  };

  return (
    <Modal
      title="Yêu cầu trả hàng"
      open={open}
      onCancel={onCancel}
      onOk={handleOk}
      confirmLoading={loading}
      destroyOnHidden
      width={700}
    >
      <Form form={form} layout="vertical" preserve={false}>
        <Form.Item
          name="reason"
          label="Lý do trả hàng"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn lý do.",
            },
          ]}
        >
          <Select options={reasons} placeholder="Chọn lý do" />
        </Form.Item>

        <Form.Item name="note" label="Ghi chú">
          <TextArea rows={3} maxLength={1000} showCount />
        </Form.Item>

        <Alert
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
          message="Lưu ý"
          description={
            <>
              Sau khi gửi yêu cầu hoàn hàng, vui lòng liên hệ
              <strong> Zalo: 0974265824</strong> để gửi hình ảnh hoặc video minh
              chứng. Nhân viên sẽ xác minh và phản hồi trong thời gian sớm nhất.
            </>
          }
        />

        <h4>Sản phẩm muốn trả</h4>

        {order?.orderItems?.map((item, index) => {
          const selected = Form.useWatch(["items", index, "selected"], form);

          return (
            <div
              key={item.id}
              style={{
                border: "1px solid #f0f0f0",
                borderRadius: 8,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  width={60}
                  height={60}
                  style={{
                    objectFit: "cover",
                    borderRadius: 6,
                  }}
                />

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{item.productName}</div>

                  <div style={{ color: "#999" }}>
                    {item.variantColor}
                    {item.variantStorage ? ` / ${item.variantStorage}` : ""}
                  </div>

                  <div
                    style={{
                      fontSize: 12,
                      color: "#888",
                    }}
                  >
                    Đã mua: {item.quantity}
                  </div>
                </div>

                <Form.Item
                  name={["items", index, "selected"]}
                  valuePropName="checked"
                  style={{ marginBottom: 0 }}
                >
                  <Checkbox>Chọn trả</Checkbox>
                </Form.Item>
              </div>

              <Form.Item
                label="Số lượng trả"
                name={["items", index, "quantity"]}
                rules={[
                  {
                    required: selected,
                    message: "Vui lòng nhập số lượng.",
                  },
                ]}
              >
                <InputNumber
                  disabled={!selected}
                  min={1}
                  max={item.quantity}
                  style={{ width: "100%" }}
                />
              </Form.Item>

              <Form.Item
                label="Lý do riêng của sản phẩm"
                name={["items", index, "reason"]}
              >
                <Input
                  disabled={!selected}
                  placeholder="Nhập lý do (không bắt buộc)"
                  maxLength={500}
                />
              </Form.Item>
            </div>
          );
        })}
      </Form>
    </Modal>
  );
}

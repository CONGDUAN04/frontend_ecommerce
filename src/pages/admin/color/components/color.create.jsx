import { useState } from "react";

import { ColorPicker, Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/admin/BaseCreateButton.jsx";

import { useColor } from "../hooks/useColor.js";

export default function CreateColorForm({ loadColor }) {
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useColor();

  const reset = () => {
    form.resetFields();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await create(values, form);

    if (res) {
      reset();
      await loadColor();
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton text="Tạo màu sắc" onClick={() => setIsOpen(true)} />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo màu sắc"
        okText="Tạo mới"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên màu"
            rules={[
              {
                required: true,
                message: "Tên màu không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập tên màu..." />
          </Form.Item>

          <Form.Item
            name="code"
            label="Mã màu"
            rules={[
              {
                required: true,
                message: "Mã màu không được để trống",
              },
            ]}
          >
            <ColorPicker
              format="hex"
              showText
              onChange={(color) => {
                form.setFieldValue("code", color.toHexString());
              }}
            />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

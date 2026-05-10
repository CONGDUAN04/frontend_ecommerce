// src/pages/admin/color/components/color.create.jsx

import { useState } from "react";
import { Form, Input, ColorPicker } from "antd";

import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";

import { useColor } from "../hooks/useColor.js";

export default function CreateColorForm({ loadColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();

  const { create } = useColor();

  const [loading, setLoading] = useState(false);

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
            label="Tên màu"
            name="name"
            rules={[
              {
                required: true,
                message: "Tên màu không được để trống",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mã màu"
            name="code"
            rules={[
              {
                required: true,
                message: "Mã màu không được để trống",
              },
            ]}
          >
            <ColorPicker
              format="hex"
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

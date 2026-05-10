// src/pages/admin/color/components/color.update.jsx

import { useEffect, useState } from "react";
import { Form, Input, ColorPicker } from "antd";

import BaseModal from "../../../../components/common/BaseModal.jsx";

import { useColor } from "../hooks/useColor.js";

export default function UpdateColorForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadColor,
}) {
  const [form] = Form.useForm();

  const { update } = useColor();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      code: dataUpdate.code,
    });
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();

    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await update(dataUpdate.id, values, form);

    if (res) {
      reset();
      await loadColor();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật màu sắc"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

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
  );
}

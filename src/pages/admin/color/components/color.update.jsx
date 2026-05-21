import { useEffect, useState } from "react";

import { ColorPicker, Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";

import { useColor } from "../hooks/useColor.js";

export default function UpdateColorForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadColor,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { update } = useColor();

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      code: dataUpdate.code,
    });
  }, [dataUpdate, form]);

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
  );
}

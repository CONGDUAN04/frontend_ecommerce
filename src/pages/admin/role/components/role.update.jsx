import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useRole } from "../hooks/useRole.js";

export default function UpdateRoleForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadRole,
}) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { update } = useRole();

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      description: dataUpdate.description,
    });
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();
    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const payload = {
      name: values.name,
      description: values.description,
    };
    const res = await update(dataUpdate.id, payload, form);
    if (res) {
      await loadRole();
      reset();
    }
    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật role"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Tên role"
          name="name"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

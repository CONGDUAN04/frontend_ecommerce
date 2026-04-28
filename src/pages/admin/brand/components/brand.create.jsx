import { useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useBrand } from "../hooks/useBrand.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function CreateBrandForm({ loadBrand }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const { create } = useBrand();
  const [loading, setLoading] = useState(false);
  const { preview, handleChangeFile, resetImage, uploading, logoValidator } =
    useImageUpload(form, {
      type: "brand",
      fieldName: "logo",
      fieldId: "logoId",
    });

  const reset = () => {
    form.resetFields();
    resetImage();
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await create(values, form);
    if (res) {
      reset();
      await loadBrand();
    }
    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton
        onClick={() => setIsOpen(true)}
        text="Tạo thương hiệu"
      />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        okText="Tạo mới"
        title="Tạo thương hiệu"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Tên thương hiệu"
            name="name"
            rules={[{ required: true, message: "Không được để trống" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Logo"
            name="logo"
            rules={[{ validator: logoValidator }]}
          >
            <UploadImage
              preview={preview}
              uploading={uploading}
              onChange={handleChangeFile}
            />
          </Form.Item>

          <Form.Item name="logoId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

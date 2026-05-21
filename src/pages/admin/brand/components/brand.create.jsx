import { useState } from "react";

import { Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/admin/BaseCreateButton.jsx";

import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";

import { useBrand } from "../hooks/useBrand.js";

import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function CreateBrandForm({ loadBrand }) {
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useBrand();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    resetImage,
    logoValidator,
  } = useImageUpload(form, {
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
        text="Tạo thương hiệu"
        onClick={() => setIsOpen(true)}
      />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo thương hiệu"
        okText="Tạo mới"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên thương hiệu"
            rules={[
              {
                required: true,
                message: "Tên thương hiệu không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập tên thương hiệu..." />
          </Form.Item>

          <Form.Item
            name="logo"
            label="Logo"
            rules={[{ validator: logoValidator }]}
          >
            <UploadImage
              preview={preview}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              onChange={handleChangeFile}
              status={error ? "error" : ""}
              help={error}
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

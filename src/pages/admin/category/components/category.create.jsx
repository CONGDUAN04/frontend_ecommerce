import { useState } from "react";

import { Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/admin/BaseCreateButton.jsx";

import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";

import { useCategory } from "../hooks/useCategory.js";

import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function CreateCategoryForm({ loadCategory }) {
  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useCategory();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    resetImage,
    logoValidator,
  } = useImageUpload(form, {
    type: "category",
    fieldName: "icon",
    fieldId: "iconId",
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
      await loadCategory();
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton text="Tạo danh mục" onClick={() => setIsOpen(true)} />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo danh mục"
        okText="Tạo mới"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="name"
            label="Tên danh mục"
            rules={[
              {
                required: true,
                message: "Tên danh mục không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập tên danh mục..." />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Icon"
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

          <Form.Item name="iconId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

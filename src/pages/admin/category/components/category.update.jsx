import { useEffect, useState } from "react";

import { Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";

import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";

import { useCategory } from "../hooks/useCategory.js";

import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function UpdateCategoryForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadCategory,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { update } = useCategory();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    setPreviewFromUrl,
    resetImage,
    logoValidator,
  } = useImageUpload(form, {
    type: "category",
    fieldName: "icon",
    fieldId: "iconId",
  });

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      icon: dataUpdate.icon,
      iconId: dataUpdate.iconId,
    });

    if (dataUpdate.icon) {
      setPreviewFromUrl(dataUpdate.icon);
    }
  }, [dataUpdate, form]);

  const reset = () => {
    form.resetFields();
    resetImage();

    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await update(dataUpdate.id, values, form);

    if (res) {
      reset();
      await loadCategory();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật danh mục"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

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
  );
}

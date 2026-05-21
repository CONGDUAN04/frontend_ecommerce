import { useEffect, useState } from "react";

import { Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal.jsx";

import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";

import { useBrand } from "../hooks/useBrand.js";

import { useImageUpload } from "../../../../hooks/useImageUpload.js";

export default function UpdateBrandForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadBrand,
}) {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);

  const { update } = useBrand();

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
    type: "brand",
    fieldName: "logo",
    fieldId: "logoId",
  });

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate.id,
      name: dataUpdate.name,
      logo: dataUpdate.logo,
      logoId: dataUpdate.logoId,
    });

    if (dataUpdate.logo) {
      setPreviewFromUrl(dataUpdate.logo);
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
      await loadBrand();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật thương hiệu"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="ID" name="id">
          <Input disabled />
        </Form.Item>

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
  );
}

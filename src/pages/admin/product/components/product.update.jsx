import { useEffect, useState } from "react";

import { Form, Input } from "antd";

import BaseModal from "../../../../components/common/admin/BaseModal";
import BaseSelect from "../../../../components/common/admin/BaseSelect";

import UploadImage from "../../../../components/common/admin/ImageUpload";

import { useProduct } from "../hooks/useProduct";
import { useProductGroup } from "../../productGroup/hooks/useProductGroup";

import { useImageUpload } from "../../../../hooks/useImageUpload";

import { mapOptions } from "../../../../utils/mapOptions";

export default function UpdateProductForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadProducts,
}) {
  const [form] = Form.useForm();

  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const { update } = useProduct();

  const { getAll: getAllGroups } = useProductGroup();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    resetImage,
    setPreviewFromUrl,
    logoValidator,
  } = useImageUpload(form, {
    type: "product",
    fieldName: "thumbnail",
    fieldId: "thumbnailId",
  });

  useEffect(() => {
    if (!openUpdate) return;

    const loadGroups = async () => {
      const res = await getAllGroups();

      setGroups(res?.data || []);
    };

    loadGroups();
  }, [openUpdate]);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      name: dataUpdate.name,
      description: dataUpdate.description,
      groupId: dataUpdate.group?.id,
      thumbnail: dataUpdate.thumbnail,
      thumbnailId: dataUpdate.thumbnailId,
    });

    if (dataUpdate.thumbnail) {
      setPreviewFromUrl(dataUpdate.thumbnail);
    }
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();

    resetImage();

    setGroups([]);

    setDataUpdate(null);

    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await update(dataUpdate.id, values, form);

    if (res) {
      reset();

      await loadProducts();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật sản phẩm"
      confirmLoading={loading}
      okText="Cập nhật"
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
              message: "Tên sản phẩm không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập tên sản phẩm..." />
        </Form.Item>

        <Form.Item
          name="groupId"
          label="Nhóm sản phẩm"
          rules={[
            {
              required: true,
              message: "Nhóm sản phẩm không được để trống",
            },
          ]}
        >
          <BaseSelect
            placeholder="Tìm kiếm nhóm sản phẩm..."
            options={mapOptions(groups)}
          />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Ảnh sản phẩm"
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

        <Form.Item name="thumbnailId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

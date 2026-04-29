import { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import { useProductGroup } from "../hooks/useProductGroup";
import { useBrand } from "../../brand/hooks/useBrand";
import { useCategory } from "../../category/hooks/useCategory";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function UpdateProductGroupForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadGroups,
}) {
  const [form] = Form.useForm();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    preview,
    handleChangeFile,
    resetImage,
    setPreviewFromUrl,
    uploading,
    logoValidator,
  } = useImageUpload(form, {
    type: "productGroup",
    fieldName: "thumbnail",
    fieldId: "thumbnailId",
  });
  const { update } = useProductGroup();
  const { getAll: getAllBrands } = useBrand();
  const { getAll: getAllCategories } = useCategory();

  useEffect(() => {
    if (!openUpdate) return;

    const loadOptions = async () => {
      const [brandRes, categoryRes] = await Promise.all([
        getAllBrands(),
        getAllCategories(),
      ]);

      setBrands(brandRes?.data || []);
      setCategories(categoryRes?.data || []);
    };

    loadOptions();
  }, [openUpdate]);

  useEffect(() => {
    if (!dataUpdate?.id) return;

    form.setFieldsValue({
      name: dataUpdate.name,
      series: dataUpdate.series,
      description: dataUpdate.description,
      brandId: dataUpdate.brand?.id,
      categoryId: dataUpdate.category?.id,
      thumbnail: dataUpdate.thumbnail,
      thumbnailId: dataUpdate.thumbnailId,
    });
    if (dataUpdate.thumbnail && !preview) {
      setPreviewFromUrl(dataUpdate.thumbnail);
    }
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setBrands([]);
    setCategories([]);
    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await update(dataUpdate.id, values, form);
    if (res) {
      reset();
      await loadGroups();
    }
    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật nhóm sản phẩm"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Tên nhóm"
          name="name"
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Series" name="series">
          <Input />
        </Form.Item>

        <Form.Item label="Thương hiệu" name="brandId">
          <Select
            options={brands.map((b) => ({ label: b.name, value: b.id }))}
          />
        </Form.Item>

        <Form.Item label="Danh mục" name="categoryId">
          <Select
            options={categories.map((c) => ({ label: c.name, value: c.id }))}
          />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Ảnh đại diện"
          name="thumbnail"
          rules={[{ validator: logoValidator }]}
        >
          <UploadImage
            preview={preview}
            uploading={uploading}
            onChange={handleChangeFile}
          />
        </Form.Item>

        <Form.Item name="thumbnailId" hidden>
          <Input />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

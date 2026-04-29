import { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useProductGroup } from "../hooks/useProductGroup";
import { useBrand } from "../../brand/hooks/useBrand";
import { useCategory } from "../../category/hooks/useCategory";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import UploadImage from "../../../../components/common/ImageUpload.jsx";

export default function CreateProductGroupForm({ loadGroups }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { preview, handleChangeFile, resetImage, uploading, logoValidator } =
    useImageUpload(form, {
      type: "productGroup",
      fieldName: "thumbnail",
      fieldId: "thumbnailId",
    });

  const { create } = useProductGroup();
  const { getAll: getAllBrands } = useBrand();
  const { getAll: getAllCategories } = useCategory();

  useEffect(() => {
    if (!isOpen) return;

    const loadOptions = async () => {
      const [brandRes, categoryRes] = await Promise.all([
        getAllBrands(),
        getAllCategories(),
      ]);

      setBrands(brandRes?.data || []);
      setCategories(categoryRes?.data || []);
    };

    loadOptions();
  }, [isOpen]);

  const reset = () => {
    form.resetFields();
    setBrands([]);
    setCategories([]);
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    setLoading(true);
    const res = await create(values, form);
    if (res) {
      reset();
      await loadGroups();
    }
    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton
        text="Tạo nhóm sản phẩm"
        onClick={() => setIsOpen(true)}
      />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo nhóm sản phẩm"
        okText="Tạo mới"
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

          <Form.Item
            label="Thương hiệu"
            name="brandId"
            rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
          >
            <Select
              options={brands.map((b) => ({
                label: b.name,
                value: b.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Danh mục"
            name="categoryId"
            rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
          >
            <Select
              options={categories.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
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
    </>
  );
}

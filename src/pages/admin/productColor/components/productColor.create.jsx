import { useEffect, useState } from "react";

import { Form, Input, Select } from "antd";

import BaseModal from "../../../../components/common/BaseModal";
import BaseCreateButton from "../../../../components/common/BaseCreateButton";

import UploadImage from "../../../../components/common/ImageUpload";

import { useProductColor } from "../hooks/useProductColor";

import { useProduct } from "../../product/hooks/useProduct";
import { useColor } from "../../color/hooks/useColor";

import { useImageUpload } from "../../../../hooks/useImageUpload";
import { universalFilterOption } from "../../../../utils/selectFilter";
export default function CreateProductColorForm({ loadProductColors }) {
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [colors, setColors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useProductColor();

  const { getAll: getProducts } = useProduct();

  const { getAll: getColors } = useColor();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    resetImage,
    logoValidator,
  } = useImageUpload(form, {
    type: "productColor",
    fieldName: "image",
    fieldId: "imageId",
  });

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      const [productRes, colorRes] = await Promise.all([
        getProducts(1, 100),
        getColors(1, 100),
      ]);

      setProducts(productRes?.data || []);
      setColors(colorRes?.data || []);
    };

    loadData();
  }, [isOpen]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setProducts([]);
    setColors([]);
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await create(values, form);

    if (res) {
      reset();
      await loadProductColors();
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton
        text="Tạo màu sản phẩm"
        onClick={() => setIsOpen(true)}
      />

      <BaseModal
        open={isOpen}
        onCancel={reset}
        onOk={() => form.submit()}
        title="Tạo màu sản phẩm"
        confirmLoading={loading}
        okText="Tạo mới"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="productId"
            label="Sản phẩm"
            rules={[
              {
                required: true,
                message: "Sản phẩm không được để trống",
              },
            ]}
          >
            <Select
              placeholder="Tìm kiếm sản phẩm..."
              showSearch
              optionFilterProp="label"
              filterOption={universalFilterOption}
              options={products.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="colorId"
            label="Màu sắc"
            rules={[
              {
                required: true,
                message: "Màu sắc không được để trống",
              },
            ]}
          >
            <Select
              placeholder="Tìm kiếm màu sắc..."
              showSearch
              optionFilterProp="label"
              filterOption={universalFilterOption}
              options={colors.map((c) => ({
                label: c.name,
                value: c.id,
              }))}
            />
          </Form.Item>

          <Form.Item
            name="image"
            label="Ảnh màu sản phẩm"
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

          <Form.Item name="imageId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

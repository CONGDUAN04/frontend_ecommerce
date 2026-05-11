import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseSelect from "../../../../components/common/BaseSelect";
import UploadImage from "../../../../components/common/ImageUpload.jsx";
import { useProductGroup } from "../hooks/useProductGroup";
import { useBrand } from "../../brand/hooks/useBrand";
import { useCategory } from "../../category/hooks/useCategory";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import { mapOptions } from "../../../../utils/mapOptions";

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

  const { update } = useProductGroup();

  const { getAll: getAllBrands } = useBrand();
  const { getAll: getAllCategories } = useCategory();

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
    type: "productGroup",
    fieldName: "thumbnail",
    fieldId: "thumbnailId",
  });

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
    if (!dataUpdate) return;

    form.setFieldsValue({
      name: dataUpdate.name,
      series: dataUpdate.series,
      description: dataUpdate.description,
      brandId: dataUpdate.brand?.id,
      categoryId: dataUpdate.category?.id,
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
          name="name"
          label="Tên nhóm"
          rules={[
            {
              required: true,
              message: "Tên nhóm không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập tên nhóm..." />
        </Form.Item>

        <Form.Item
          name="series"
          label="Series"
          rules={[
            {
              required: true,
              message: "Series không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập series..." />
        </Form.Item>

        <Form.Item
          name="brandId"
          label="Thương hiệu"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn thương hiệu",
            },
          ]}
        >
          <BaseSelect
            placeholder="Tìm kiếm thương hiệu..."
            options={mapOptions(brands)}
          />
        </Form.Item>

        <Form.Item
          name="categoryId"
          label="Danh mục"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn danh mục",
            },
          ]}
        >
          <BaseSelect
            placeholder="Tìm kiếm danh mục..."
            options={mapOptions(categories)}
          />
        </Form.Item>

        <Form.Item name="description" label="Mô tả">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="thumbnail"
          label="Ảnh đại diện"
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

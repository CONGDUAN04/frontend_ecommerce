import { useEffect, useState } from "react";
import { Form, Select, Input } from "antd";

import BaseModal from "../../../../components/common/BaseModal";
import { useProductColor } from "../hooks/useProductColor";
import { useColor } from "../../color/hooks/useColor";

import UploadImage from "../../../../components/common/ImageUpload";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import { universalFilterOption } from "../../../../utils/selectFilter";
export default function UpdateProductColor({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadProductColors,
}) {
  const [form] = Form.useForm();

  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { update } = useProductColor();
  const { getAll: getColors } = useColor();

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
    type: "productColor",
    fieldName: "image",
    fieldId: "imageId",
  });

  useEffect(() => {
    if (!openUpdate) return;

    const loadColors = async () => {
      const res = await getColors(1, 100);
      setColors(res?.data || []);
    };

    loadColors();
  }, [openUpdate]);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      colorId: dataUpdate.color?.id,
      image: dataUpdate.image,
      imageId: dataUpdate.imageId,
    });

    if (dataUpdate.image) {
      setPreviewFromUrl(dataUpdate.image);
    }
  }, [dataUpdate]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setColors([]);
    setOpenUpdate(false);
    setDataUpdate(null);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await update(dataUpdate.id, values, form);

    if (res) {
      reset();
      await loadProductColors();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onCancel={reset}
      onOk={() => form.submit()}
      okText="Cập nhật"
      title="Cập nhật màu sản phẩm"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
  );
}

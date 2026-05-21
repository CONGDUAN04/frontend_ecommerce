import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal";
import BaseSelect from "../../../../components/common/admin/BaseSelect";
import UploadImage from "../../../../components/common/admin/ImageUpload";
import { useProductColor } from "../hooks/useProductColor";
import { useColor } from "../../color/hooks/useColor";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import { mapOptions } from "../../../../utils/mapOptions";

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
  }, [dataUpdate, form]);

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
          <BaseSelect
            placeholder="Tìm kiếm màu sắc..."
            options={mapOptions(colors)}
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

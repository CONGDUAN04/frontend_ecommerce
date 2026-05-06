import { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import BaseModal from "../../../../components/common/BaseModal";
import { useProduct } from "../hooks/useProduct";
import { useProductGroup } from "../../productGroup/hooks/useProductGroup";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import UploadImage from "../../../../components/common/ImageUpload";

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

  const {
    preview,
    handleChangeFile,
    resetImage,
    setPreviewFromUrl,
    uploading,
    logoValidator,
  } = useImageUpload(form, {
    type: "product",
    fieldName: "thumbnail",
    fieldId: "thumbnailId",
  });

  const { update } = useProduct();
  const { getAll: getAllGroups } = useProductGroup();

  useEffect(() => {
    if (!openUpdate) return;
    getAllGroups().then((res) => setGroups(res?.data || []));
  }, [openUpdate]);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      ...dataUpdate,
      groupId: dataUpdate.group?.id,
    });

    if (dataUpdate.thumbnail && !preview) {
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
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          name="name"
          label="Tên"
          rules={[
            { required: true, message: "Tên sản phẩm không được để trống" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="groupId"
          label="Nhóm"
          rules={[
            { required: true, message: "Nhóm sản phẩm không được để trống" },
          ]}
        >
          <Select
            showSearch
            placeholder="Tìm nhóm sản phẩm..."
            optionFilterProp="label"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            options={groups.map((g) => ({
              label: g.name,
              value: g.id,
            }))}
          />
        </Form.Item>

        <Form.Item name="storage" label="Dung lượng">
          <Input />
        </Form.Item>

        <Form.Item name="thumbnail" label="Ảnh">
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

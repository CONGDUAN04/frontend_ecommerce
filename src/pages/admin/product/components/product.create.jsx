import { useEffect, useState } from "react";
import { Form, Input, Select, InputNumber } from "antd";
import BaseModal from "../../../../components/common/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/BaseCreateButton.jsx";
import { useProduct } from "../hooks/useProduct";
import { useProductGroup } from "../../productGroup/hooks/useProductGroup";
import { useImageUpload } from "../../../../hooks/useImageUpload";
import UploadImage from "../../../../components/common/ImageUpload";

export default function CreateProductForm({ loadProducts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);

  const { preview, handleChangeFile, resetImage, uploading, logoValidator } =
    useImageUpload(form, {
      type: "product",
      fieldName: "thumbnail",
      fieldId: "thumbnailId",
    });

  const { create } = useProduct();
  const { getAll: getAllGroups } = useProductGroup();

  useEffect(() => {
    if (!isOpen) return;

    const load = async () => {
      const res = await getAllGroups();
      setGroups(res?.data || []);
    };

    load();
  }, [isOpen]);

  const reset = () => {
    form.resetFields();
    resetImage();
    setGroups([]);
    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await create(values, form);
    if (res) {
      reset();
      await loadProducts();
    }
    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton text="Tạo sản phẩm" onClick={() => setIsOpen(true)} />
      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo sản phẩm"
        confirmLoading={loading}
        okText="Tạo mới"
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

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            name="thumbnail"
            label="Ảnh"
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

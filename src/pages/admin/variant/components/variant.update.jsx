import { useEffect, useState } from "react";

import { Form, Input, InputNumber, Select } from "antd";

import BaseModal from "../../../../components/common/BaseModal";

import { useVariant } from "../hooks/useVariant";

import { useProductColor } from "../../../admin/productColor/hooks/useProductColor";

export default function UpdateVariantForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadVariants,
}) {
  const [form] = Form.useForm();

  const [productColors, setProductColors] = useState([]);

  const [loading, setLoading] = useState(false);

  const { update } = useVariant();

  const { getAll: getProductColors } = useProductColor();

  useEffect(() => {
    if (!openUpdate || !dataUpdate?.product?.id) return;

    getProductColors(1, 100, {
      productId: dataUpdate.product.id,
    }).then((res) => {
      setProductColors(res?.data || []);
    });
  }, [openUpdate, dataUpdate]);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      id: dataUpdate.id,

      sku: dataUpdate.sku,

      storage: dataUpdate.storage,

      productColorId: dataUpdate.productColor?.id,

      price: dataUpdate.price,

      comparePrice: dataUpdate.comparePrice,

      quantity: dataUpdate.quantity,
    });
  }, [dataUpdate, form]);

  const reset = () => {
    form.resetFields();

    setProductColors([]);

    setDataUpdate(null);

    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await update(dataUpdate.id, values, form);

    if (res) {
      reset();

      await loadVariants();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onCancel={reset}
      onOk={() => form.submit()}
      okText="Cập nhật"
      title="Cập nhật biến thể"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="id" label="ID">
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="sku"
          label="SKU"
          rules={[
            {
              required: true,
              message: "SKU không được để trống",
            },
          ]}
        >
          <Input placeholder="Nhập SKU" />
        </Form.Item>

        <Form.Item name="storage" label="Dung lượng">
          <Input placeholder="Ví dụ: 128GB" />
        </Form.Item>

        <Form.Item
          name="productColorId"
          label="Màu sắc"
          rules={[
            {
              required: true,
              message: "Màu sắc không được để trống",
            },
          ]}
        >
          <Select
            showSearch
            placeholder="Chọn màu sắc"
            optionFilterProp="label"
            options={productColors.map((pc) => ({
              label: `${pc.color?.name} - ${pc.product?.name}`,
              value: pc.id,
            }))}
            filterOption={(input, option) => {
              const text = option?.label?.toLowerCase() || "";

              const keywords = input.toLowerCase().trim().split(/\s+/);

              return keywords.every((keyword) => text.includes(keyword));
            }}
          />
        </Form.Item>

        <Form.Item
          name="price"
          label="Giá bán"
          rules={[
            {
              required: true,
              message: "Giá bán không được để trống",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá bán"
          />
        </Form.Item>

        <Form.Item
          name="comparePrice"
          label="Giá gốc"
          rules={[
            {
              required: true,
              message: "Giá gốc không được để trống",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập giá gốc"
          />
        </Form.Item>

        <Form.Item
          name="quantity"
          label="Số lượng"
          rules={[
            {
              required: true,
              message: "Số lượng không được để trống",
            },
          ]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Nhập số lượng"
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
}

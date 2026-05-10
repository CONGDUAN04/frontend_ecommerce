import { useEffect, useState } from "react";

import { Form, Input, InputNumber, Select } from "antd";

import BaseModal from "../../../../components/common/BaseModal";
import BaseCreateButton from "../../../../components/common/BaseCreateButton";

import { useVariant } from "../hooks/useVariant";
import { useProduct } from "../../product/hooks/useProduct";
import { useProductColor } from "../../../admin/productColor/hooks/useProductColor";
import { universalFilterOption } from "../../../../utils/selectFilter";
export default function CreateVariantForm({ loadVariants }) {
  const [isOpen, setIsOpen] = useState(false);

  const [products, setProducts] = useState([]);

  const [productColors, setProductColors] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useVariant();

  const { getAll: getProducts } = useProduct();

  const { getAll: getProductColors } = useProductColor();

  useEffect(() => {
    if (!isOpen) return;

    const loadData = async () => {
      const productRes = await getProducts(1, 100);

      setProducts(productRes?.data || []);
    };

    loadData();
  }, [isOpen]);

  const handleChangeProduct = async (productId) => {
    form.setFieldValue("productColorId", undefined);

    const res = await getProductColors(1, 100, {
      productId,
    });

    setProductColors(res?.data || []);
  };

  const reset = () => {
    form.resetFields();

    setProducts([]);

    setProductColors([]);

    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await create(values, form);

    if (res) {
      reset();

      await loadVariants();
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton text="Tạo biến thể" onClick={() => setIsOpen(true)} />

      <BaseModal
        open={isOpen}
        onCancel={reset}
        onOk={() => form.submit()}
        title="Tạo biến thể"
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
              showSearch
              placeholder="Chọn sản phẩm"
              onChange={handleChangeProduct}
              optionFilterProp="label"
              options={products.map((p) => ({
                label: p.name,
                value: p.id,
              }))}
              filterOption={universalFilterOption}
            />
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
            <Input />
          </Form.Item>

          <Form.Item name="storage" label="Dung lượng">
            <Input placeholder="128GB" />
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
              placeholder="Chọn màu sản phẩm"
              disabled={!form.getFieldValue("productId")}
              options={productColors.map((pc) => ({
                label: `${pc.color?.name} - ${pc.product?.name}`,
                value: pc.id,
              }))}
              filterOption={universalFilterOption}
            />
          </Form.Item>

          <Form.Item
            name="price"
            label="Giá bán"
            rules={[
              {
                required: true,
                message: "Giá không được để trống",
              },
            ]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
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
            <InputNumber min={0} style={{ width: "100%" }} />
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
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

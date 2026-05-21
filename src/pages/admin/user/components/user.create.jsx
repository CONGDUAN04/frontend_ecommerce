import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import BaseCreateButton from "../../../../components/common/admin/BaseCreateButton.jsx";
import BaseSelect from "../../../../components/common/admin/BaseSelect.jsx";
import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";
import { useUser } from "../hooks/useUser.js";
import { useRole } from "../../role/hooks/useRole.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import { mapOptions } from "../../../../utils/mapOptions.js";

export default function CreateUserForm({ loadUser }) {
  const [isOpen, setIsOpen] = useState(false);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const { create } = useUser();
  const { getAll: getAllRoles } = useRole();

  const {
    preview,
    error,
    isUploading,
    uploadProgress,
    handleChangeFile,
    resetImage,
    logoValidator,
  } = useImageUpload(form, {
    type: "user",
    fieldName: "avatar",
    fieldId: "avatarId",
  });

  useEffect(() => {
    if (!isOpen) return;

    const loadRoles = async () => {
      const res = await getAllRoles();

      setRoles(res?.data || []);
    };

    loadRoles();
  }, [isOpen]);

  const reset = () => {
    form.resetFields();
    resetImage();

    setRoles([]);

    setIsOpen(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const res = await create(values, form);

    if (res) {
      reset();
      await loadUser();
    }

    setLoading(false);
  };

  return (
    <>
      <BaseCreateButton text="Tạo người dùng" onClick={() => setIsOpen(true)} />

      <BaseModal
        open={isOpen}
        onOk={() => form.submit()}
        onCancel={reset}
        title="Tạo người dùng"
        okText="Tạo mới"
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="username"
            label="Email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input placeholder="Nhập email..." />
          </Form.Item>

          <Form.Item
            name="fullName"
            label="Họ và tên"
            rules={[
              {
                required: true,
                message: "Họ và tên không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập họ và tên..." />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Số điện thoại không được để trống",
              },
            ]}
          >
            <Input placeholder="Nhập số điện thoại..." />
          </Form.Item>

          <Form.Item
            name="roleId"
            label="Phân quyền"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn phân quyền",
              },
            ]}
          >
            <BaseSelect
              placeholder="Tìm kiếm phân quyền..."
              options={mapOptions(roles)}
            />
          </Form.Item>

          <Form.Item
            name="avatar"
            label="Avatar"
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

          <Form.Item name="avatarId" hidden>
            <Input />
          </Form.Item>
        </Form>
      </BaseModal>
    </>
  );
}

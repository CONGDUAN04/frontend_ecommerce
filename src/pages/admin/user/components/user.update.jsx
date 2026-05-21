import { useEffect, useState } from "react";
import { Form, Input } from "antd";
import BaseModal from "../../../../components/common/admin/BaseModal.jsx";
import BaseSelect from "../../../../components/common/admin/BaseSelect.jsx";
import UploadImage from "../../../../components/common/admin/ImageUpload.jsx";
import { useUser } from "../hooks/useUser.js";
import { useRole } from "../../role/hooks/useRole.js";
import { useImageUpload } from "../../../../hooks/useImageUpload.js";
import { mapOptions } from "../../../../utils/mapOptions.js";

export default function UpdateUserForm({
  openUpdate,
  setOpenUpdate,
  dataUpdate,
  setDataUpdate,
  loadUser,
}) {
  const [form] = Form.useForm();

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { update } = useUser();
  const { getAll: getAllRoles } = useRole();

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
    type: "user",
    fieldName: "avatar",
    fieldId: "avatarId",
  });

  useEffect(() => {
    if (!openUpdate) return;

    const loadRoles = async () => {
      const res = await getAllRoles();

      setRoles(res?.data || []);
    };

    loadRoles();
  }, [openUpdate]);

  useEffect(() => {
    if (!dataUpdate) return;

    form.setFieldsValue({
      username: dataUpdate.username,
      fullName: dataUpdate.fullName,
      phone: dataUpdate.phone,
      roleId: dataUpdate.role?.id,
      avatar: dataUpdate.avatar,
      avatarId: dataUpdate.avatarId,
    });

    if (dataUpdate.avatar) {
      setPreviewFromUrl(dataUpdate.avatar);
    }
  }, [dataUpdate, form]);

  const reset = () => {
    form.resetFields();
    resetImage();

    setRoles([]);

    setDataUpdate(null);
    setOpenUpdate(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const payload = { ...values };

    if (Number(payload.roleId) === Number(dataUpdate.role?.id)) {
      delete payload.roleId;
    }

    const res = await update(dataUpdate.id, payload, form);

    if (res) {
      reset();
      await loadUser();
    }

    setLoading(false);
  };

  return (
    <BaseModal
      open={openUpdate}
      onOk={() => form.submit()}
      onCancel={reset}
      title="Cập nhật người dùng"
      okText="Cập nhật"
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Email" name="username">
          <Input disabled />
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
  );
}

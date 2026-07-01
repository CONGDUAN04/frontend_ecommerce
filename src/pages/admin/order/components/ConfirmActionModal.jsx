import { Modal } from "antd";

export default function ConfirmActionModal({
  open,
  setOpen,
  loading,
  title,
  content,
  okText,
  onSubmit,
}) {
  const handleOk = async () => {
    const success = await onSubmit();

    if (success) {
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      confirmLoading={loading}
      okText={okText}
      cancelText="Đóng"
    >
      {content}
    </Modal>
  );
}

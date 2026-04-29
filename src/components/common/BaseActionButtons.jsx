import { Button, Tooltip, Popconfirm } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BaseActionButtons = ({
  record,
  onView,
  onEdit,
  onDelete,
  disableEdit = false,
  disableDelete = false,
  deleteTitle = "Xóa",
  deleteDescription = "Bạn có chắc chắn muốn xóa?",
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip title="Xem chi tiết">
        <Button
          icon={<EyeOutlined />}
          style={{
            backgroundColor: "#e6f4ff",
            color: "#1677ff",
            border: "1px solid #91caff",
            borderRadius: 8,
          }}
          onClick={() => onView(record)}
        />
      </Tooltip>

      <Tooltip
        title={
          disableEdit ? "Chỉ có thể chỉnh sửa khi đang hoạt động" : "Chỉnh sửa"
        }
      >
        <Button
          icon={<EditOutlined />}
          disabled={disableEdit}
          style={{
            backgroundColor: disableEdit ? undefined : "#fff7e6",
            color: disableEdit ? undefined : "#fa8c16",
            border: disableEdit ? undefined : "1px solid #ffd591",
            borderRadius: 8,
          }}
          onClick={() => !disableEdit && onEdit(record)}
        />
      </Tooltip>

      {disableDelete ? (
        <Tooltip title="Không thể xóa khi đang bị vô hiệu hóa">
          <Button
            icon={<DeleteOutlined />}
            disabled
            danger
            style={{
              borderRadius: 8,
            }}
          />
        </Tooltip>
      ) : (
        <Popconfirm
          title={deleteTitle}
          description={deleteDescription}
          okText="Xóa"
          cancelText="Hủy"
          okButtonProps={{ danger: true }}
          onConfirm={() => onDelete(record)}
        >
          <Tooltip title="Xóa">
            <Button
              icon={<DeleteOutlined />}
              danger
              style={{
                backgroundColor: "#fff1f0",
                color: "#ff4d4f",
                border: "1px solid #ffccc7",
                borderRadius: 8,
              }}
            />
          </Tooltip>
        </Popconfirm>
      )}
    </div>
  );
};

export default BaseActionButtons;

import { Button, Form, Input, Typography, Card } from "antd";
import { useContext, useState } from "react";
import { NotifyContext } from "../../contexts/notify.context";
import { resetPasswordAPI } from "../../services/api.auth";
import { handleApiSuccess, handleApiError } from "../../utils/apiHandler";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ResetPassword = () => {
  const [form] = Form.useForm();
  const { api } = useContext(NotifyContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("reset_email");

  if (!email) {
    navigate("/forgot-password");
    return null;
  }

  const onFinish = async (values) => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await resetPasswordAPI(email, values.password);

      handleApiSuccess(api, res?.message);

      localStorage.removeItem("reset_email");

      navigate("/login");
    } catch (err) {
      handleApiError(api, err, form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: 16,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
        styles={{ body: { padding: "40px 32px" } }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Title
            level={2}
            style={{
              marginBottom: 10,
              marginTop: 0,
              fontSize: 30,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Đặt lại mật khẩu
          </Title>

          <Text
            style={{
              display: "block",
              fontSize: 15,
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Tạo mật khẩu mới cho tài khoản
            <br />
            <strong style={{ color: "#1e293b" }}>{email}</strong>
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                message:
                  "Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ cái và 1 số",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu mới"
              style={{ height: 48 }}
            />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Nhập lại mật khẩu"
              style={{ height: 48 }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            disabled={loading}
            style={{
              height: 48,
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;

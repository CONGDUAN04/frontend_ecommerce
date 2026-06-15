import { Form, Input, Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { forgotPasswordAPI } from "../../services/api.auth";

import { handleApiError, handleApiSuccess } from "../../utils/apiHandler";

const { Title, Text } = Typography;

const ForgotPasswordPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const res = await forgotPasswordAPI(values.username);

      localStorage.setItem("reset_email", values.username);

      handleApiSuccess(res?.message);

      navigate("/verify-otp");
    } catch (err) {
      handleApiError(err, form);
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
          maxWidth: 420,
          borderRadius: 16,
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
        styles={{
          body: {
            padding: "40px 32px",
          },
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
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
            Quên mật khẩu
          </Title>

          <Text
            style={{
              display: "block",
              fontSize: 15,
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Nhập email để nhận mã OTP
            <br />
            đặt lại mật khẩu của bạn
          </Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="username"
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
            <Input size="large" placeholder="Nhập email của bạn" />
          </Form.Item>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 8,
            }}
          >
            <Button
              size="large"
              onClick={() => navigate("/login")}
              disabled={loading}
              style={{
                flex: 1,
                height: 48,
                borderColor: "#cbd5e1",
                color: "#475569",
                fontWeight: 500,
              }}
            >
              ← Quay lại
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{
                flex: 1,
                height: 48,
                fontWeight: 500,
              }}
            >
              Nhận mã
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default ForgotPasswordPage;

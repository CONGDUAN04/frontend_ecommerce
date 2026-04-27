import { useEffect, useState, useContext } from "react";
import { Button, Form, Typography, Input, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { verifyOtpAPI, resendOtpAPI } from "../../services/api.auth";
import { NotifyContext } from "../../contexts/notify.context";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler";

const { Title, Text } = Typography;

export default function VerifyOtpPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { api } = useContext(NotifyContext);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const email =
    localStorage.getItem("verify_email") || localStorage.getItem("reset_email");

  useEffect(() => {
    if (!email) {
      navigate("/forgot-password");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const onFinish = async (values) => {
    try {
      setVerifyLoading(true);
      const isReset = localStorage.getItem("reset_email");

      const res = await verifyOtpAPI({
        username: email,
        otp: values.otp,
        type: isReset ? "RESET_PASSWORD" : "VERIFY_EMAIL",
      });

      handleApiSuccess(api, res?.message);

      if (isReset) {
        navigate("/reset-password");
      } else {
        localStorage.removeItem("verify_email");
        navigate("/login");
      }
    } catch (err) {
      handleApiError(api, err, form);
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    try {
      setResendLoading(true);
      const isReset = localStorage.getItem("reset_email");

      await resendOtpAPI({
        username: email,
        type: isReset ? "RESET_PASSWORD" : "VERIFY_EMAIL",
      });

      handleApiSuccess(api, "Đã gửi lại OTP");
      setCountdown(30);
    } catch (err) {
      handleApiError(api, err);
    } finally {
      setResendLoading(false);
    }
  };

  const handleGoBack = () => {
    const isReset = localStorage.getItem("reset_email");
    if (isReset) {
      localStorage.removeItem("reset_email");
      navigate("/forgot-password");
    } else {
      localStorage.removeItem("verify_email");
      navigate("/register");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        padding: "16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 450,
          background: "#ffffff",
          borderRadius: 16,
          padding: "52px 40px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <Title
            level={2}
            style={{
              textAlign: "center",
              fontSize: 32,
              fontWeight: 700,
              marginBottom: 10,
              color: "#0f172a",
              marginTop: 0,
            }}
          >
            Xác thực OTP
          </Title>

          <Text
            style={{
              textAlign: "center",
              display: "block",
              fontSize: 16,
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Nhập mã xác thực 6 chữ số
            <br />
            được gửi tới <strong style={{ color: "#1e293b" }}>{email}</strong>
          </Text>
        </div>

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="otp"
            rules={[
              { required: true, message: "OTP không hợp lệ" },
              { pattern: /^\d{6}$/, message: "OTP phải là 6 số" },
            ]}
            style={{ marginBottom: 30, textAlign: "center" }}
          >
            <Input.OTP length={6} size="large" style={{ gap: 12 }} />
          </Form.Item>

          <Row gutter={12} style={{ marginBottom: 24 }}>
            <Col span={12}>
              <Button
                block
                size="large"
                onClick={handleGoBack}
                disabled={verifyLoading || resendLoading}
                style={{
                  height: 48,
                  borderColor: "#cbd5e1",
                  color: "#475569",
                  fontWeight: 500,
                }}
              >
                ← Quay lại
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={verifyLoading}
                style={{ height: 48, fontWeight: 500 }}
              >
                Xác nhận
              </Button>
            </Col>
          </Row>
        </Form>

        <div style={{ textAlign: "center" }}>
          <Button
            onClick={handleResendOtp}
            loading={resendLoading}
            disabled={countdown > 0 || verifyLoading || resendLoading}
            style={{
              borderColor: "#2563eb",
              color: "#2563eb",
              borderRadius: 100,
              borderWidth: 1,
              padding: "8px 24px",
              height: "auto",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Nhận mã lại"}
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Divider, Button, Form, Input, Row, Col, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAPI } from "../../services/api.auth.js";
import { useContext, useState } from "react";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import "../../styles/register.css";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { api } = useContext(NotifyContext);

  const onFinish = async (values) => {
    if (loading) return;

    setLoading(true);
    try {
      const res = await registerUserAPI({
        ...values,
        type: "VERIFY_EMAIL",
      });

      handleApiSuccess(api, res?.message);

      localStorage.setItem("verify_email", values.username);

      navigate("/verify-otp");
    } catch (err) {
      handleApiError(api, err, form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <div className="register-box">
            <h2 className="register-title">Đăng ký tài khoản</h2>
            <p className="register-subtitle">Tạo tài khoản mới 🎉</p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={loading}
            >
              <Form.Item
                label="Họ và tên"
                name="fullName"
                rules={[
                  { required: true, message: "Họ và tên không được để trống" },
                  { min: 3, message: "Ít nhất 3 ký tự" },
                ]}
              >
                <Input size="large" placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" />
              </Form.Item>
              <Typography.Text
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#52c41a",
                  marginTop: -16,
                  marginBottom: 16,
                  gap: 6,
                }}
              >
                <CheckCircleOutlined />
                Hóa đơn VAT khi mua hàng sẽ được gửi qua email này
              </Typography.Text>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không được để trống",
                  },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                    message:
                      "Mật khẩu tối thiểu 6 ký tự, có ít nhất 1 chữ cái và 1 số",
                  },
                ]}
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Xác nhận mật khẩu" },
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
                <Input.Password size="large" placeholder="Nhập lại mật khẩu" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="register-btn"
                block
              >
                Đăng ký
              </Button>
            </Form>

            <Divider />

            <div className="register-footer login-link">
              <span>Đã có tài khoản?</span>
              <Link to="/login">Đăng nhập ngay</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;

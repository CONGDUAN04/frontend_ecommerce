import { Divider, Button, Form, Input, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { getAccountAPI, loginUserAPI } from "../../services/api.auth.js";
import { useContext, useState } from "react";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import "../../styles/auth/login.css";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";
import { AuthContext } from "../../contexts/auth.context.jsx";

const LoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { api } = useContext(NotifyContext);
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    if (loading) return;

    setLoading(true);

    try {
      // 🔥 login
      const res = await loginUserAPI(values.email, values.password);

      const token = res?.data?.access_token;
      if (!token) throw new Error("Token không hợp lệ");

      localStorage.setItem("access_token", token);

      // 🔥 get user
      const userRes = await getAccountAPI();
      const user = userRes?.data;

      if (!user) throw new Error("Không lấy được user");

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      handleApiSuccess(api, res?.message);

      const role = user?.role?.name;
      navigate(role === "ADMIN" || role === "SUPER_ADMIN" ? "/admin" : "/");
    } catch (err) {
      handleApiError(api, err, form);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="login-container">
      <Row
        justify="center"
        align="middle"
        style={{ minHeight: "100vh", width: "100%" }}
      >
        <Col
          xs={24}
          sm={20}
          md={14}
          lg={10}
          xl={8}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="login-box">
            <h2 className="login-title">Đăng nhập</h2>
            <p className="login-subtitle">Chào mừng bạn trở lại 👋</p>

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={loading}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email không được để trống!" },
                  { type: "email", message: "Email không đúng định dạng!" },
                ]}
              >
                <Input size="large" placeholder="example@gmail.com" autoFocus />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" },
                  { min: 6, message: "Mật khẩu tối thiểu 6 ký tự!" },
                ]}
              >
                <Input.Password size="large" placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
                className="login-btn"
                block
              >
                Đăng nhập
              </Button>
            </Form>
            <Divider />
            <div className="login-footer forgot-password">
              <Link to="/forgot-password">Quên mật khẩu?</Link>
            </div>

            <div className="login-footer register-link">
              <span>Chưa có tài khoản?</span>
              <Link to="/register">Đăng ký ngay</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;

import { Search, ShoppingCart, Menu, LogIn, User } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Badge, Spin } from "antd";
import { useContext, useState, useCallback, useEffect } from "react";

import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";
import { AuthContext } from "../../contexts/auth.context.jsx";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { logoutAPI } from "../../services/api.auth.js";

import "../../styles/client/layouts/header.css";

const Header = ({ cartCount = 0 }) => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);
  const { api } = useContext(NotifyContext);

  const [loadingLogout, setLoadingLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = useCallback(async () => {
    if (loadingLogout) return;

    setLoadingLogout(true);

    try {
      const res = await logoutAPI();

      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      setUser(null);

      handleApiSuccess(api, res?.message);

      navigate("/");
    } catch (err) {
      handleApiError(api, err);
    } finally {
      setLoadingLogout(false);
    }
  }, [api, navigate, setUser, loadingLogout]);

  const userMenu = {
    items: [
      {
        key: "profile",
        label: "Thông tin cá nhân",
      },
      {
        type: "divider",
      },
      {
        key: "logout",
        danger: true,
        label: loadingLogout ? <Spin size="small" /> : "Đăng xuất",
      },
    ],

    onClick: ({ key }) => {
      if (key === "logout") handleLogout();

      if (key === "profile") navigate("/profile");
    },
  };

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        {/* LEFT */}
        <div className="header-left">
          <div className="logo" onClick={() => navigate("/")}>
            TechZone
          </div>

          <nav className="nav-menu">
            <span>Danh mục</span>
            <span>Flash Sale</span>
            <span>Tin công nghệ</span>
            <span>Trả góp</span>
          </nav>
        </div>

        {/* SEARCH */}
        <div className="search-box">
          <Search size={18} />

          <input type="text" placeholder="Bạn cần tìm gì hôm nay?" />
        </div>

        {/* ACTIONS */}
        <div className="header-actions">
          {user && (
            <Badge count={cartCount} size="small">
              <div className="cart-btn" onClick={() => navigate("/cart")}>
                <ShoppingCart size={22} />
              </div>
            </Badge>
          )}

          {user ? (
            <Dropdown menu={userMenu} placement="bottomRight">
              <div className="user-box">
                <Avatar
                  size={36}
                  src={
                    user?.avatar
                      ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
                      : null
                  }
                  icon={<User size={16} />}
                />

                <span>{user?.fullName || user?.username}</span>
              </div>
            </Dropdown>
          ) : (
            <button className="login-btn" onClick={() => navigate("/login")}>
              <LogIn size={18} />
              Đăng nhập
            </button>
          )}

          <div className="mobile-menu">
            <Menu size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

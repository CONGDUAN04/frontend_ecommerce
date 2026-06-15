import { Search, ShoppingCart, Menu, LogIn, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dropdown, Avatar, Badge, Spin } from "antd";
import { useContext, useState, useCallback, useEffect, useMemo } from "react";

import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";
import { AuthContext } from "../../contexts/auth.context.jsx";
import toast from "react-hot-toast";
import { logoutAPI } from "../../services/api.auth.js";
import { CartContext } from "../../contexts/cart.context";
import "../../styles/client/layouts/header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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

      handleApiSuccess(res?.message);

      navigate("/");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoadingLogout(false);
    }
  }, [navigate, setUser, loadingLogout]);

  const userMenuItems = useMemo(
    () => [
      {
        key: "profile",
        label: <span className="dropdown-item-custom">Thông tin cá nhân</span>,
      },
      { type: "divider" },
      {
        key: "logout",
        danger: true,
        label: loadingLogout ? (
          <Spin size="small" />
        ) : (
          <span className="dropdown-item-custom">Đăng xuất</span>
        ),
      },
    ],
    [loadingLogout],
  );

  return (
    <header className={`header ${scrolled ? "header-scrolled" : ""}`}>
      <div className="header-container">
        <div className="header-left">
          <div className="logo" onClick={() => navigate("/")}>
            Tech<span>Zone</span>
          </div>
          <nav className="nav-menu">
            <span className="nav-item active">Danh mục</span>
            <span className="nav-item">Flash Sale</span>
            <span className="nav-item">Tin công nghệ</span>
            <span className="nav-item">Trả góp</span>
          </nav>
        </div>

        <div
          className={`search-box ${isMobileSearchOpen ? "mobile-expanded" : ""}`}
        >
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Bạn cần tìm gì hôm nay?..." />
          <button
            className="close-search-btn"
            onClick={() => setIsMobileSearchOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        <div className="header-actions">
          <button
            className="action-icon-btn mobile-search-trigger"
            onClick={() => setIsMobileSearchOpen(true)}
            aria-label="Tìm kiếm"
          >
            <Search size={20} />
          </button>

          <Badge
            count={user ? cart.items.length : 0}
            size="small"
            offset={[-2, 4]}
          >
            <button
              className="cart-btn"
              onClick={() => {
                if (user) {
                  navigate("/cart");
                } else {
                  toast.warning("Yêu cầu đăng nhập");
                  navigate("/login");
                }
              }}
              aria-label="Giỏ hàng"
            >
              <ShoppingCart size={20} />
              <span className="cart-name">Giỏ hàng</span>
            </button>
          </Badge>
          {user ? (
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === "logout") handleLogout();
                  if (key === "profile") navigate("/profile");
                },
              }}
              placement="bottomRight"
              arrow
            >
              <div className="user-box">
                <Avatar
                  size={34}
                  className="user-avatar"
                  src={
                    user?.avatar
                      ? `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`
                      : null
                  }
                  icon={<User size={16} />}
                />
                <span className="user-name">
                  {user?.fullName || user?.username}
                </span>
              </div>
            </Dropdown>
          ) : (
            <div className="user-box" onClick={() => navigate("/login")}>
              <Avatar
                size={28}
                className="user-avatar"
                icon={<User size={14} />}
              />
              <span className="user-name">Đăng nhập</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import { logoutAPI } from "../../services/api.auth.js";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";
import "../../styles/admin/header.css";

import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

const ROUTE_BREADCRUMB = {
  "/admin": ["Dashboard"],

  "/admin/product-groups": ["Nhóm sản phẩm"],
  "/admin/products": ["Nhóm sản phẩm", "Sản phẩm"],
  "/admin/colors": ["Nhóm sản phẩm", "Màu sắc"],
  "/admin/product-colors": ["Nhóm sản phẩm", "Màu theo sản phẩm"],
  "/admin/variants": ["Nhóm sản phẩm", "Biến thể"],

  "/admin/categories": ["Danh mục"],
  "/admin/brands": ["Thương hiệu"],

  "/admin/orders": ["Quản lý đơn hàng", "Đơn hàng"],

  "/admin/returns": ["Quản lý đơn hàng", "Hoàn trả"],

  "/admin/exchanges": ["Quản lý đơn hàng", "Đổi hàng"],

  "/admin/users": ["Người dùng"],
  "/admin/roles": ["Vai trò"],

  "/admin/settings": ["Cài đặt"],
};
function useBreadcrumb(path) {
  return useMemo(() => {
    const match = Object.keys(ROUTE_BREADCRUMB)
      .sort((a, b) => b.length - a.length)
      .find((route) => path.startsWith(route));

    return ROUTE_BREADCRUMB[match] || ["Dashboard"];
  }, [path]);
}

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [dropOpen, setDropOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  const breadcrumb = useBreadcrumb(location.pathname);
  const current = breadcrumb[breadcrumb.length - 1];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);

    try {
      await logoutAPI();

      localStorage.clear();

      setUser(null);

      handleApiSuccess("Đăng xuất thành công!");

      setDropOpen(false);

      navigate("/");
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const initials = (user?.fullName || "AD")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="th-header">
      <div className="th-header__container">
        <div className="th-header__left">
          <div className="th-header__title-area">
            <h1 className="th-header__title">{current}</h1>

            <div className="th-header__breadcrumb">
              {breadcrumb.map((item, index) => (
                <span
                  key={index}
                  className={`th-header__breadcrumb-item ${
                    index === breadcrumb.length - 1
                      ? "th-header__breadcrumb-item--active"
                      : ""
                  }`}
                >
                  {item}

                  {index < breadcrumb.length - 1 && (
                    <span className="th-header__breadcrumb-sep">/</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="th-header__search-box">
          <Search size={15} className="th-header__search-icon" />

          <input
            className="th-header__search-input"
            placeholder="Tìm kiếm nhanh..."
          />
        </div>

        <div className="th-header__right">
          <div className="th-header__actions">
            <div className="th-header__action-btn">
              <Bell size={18} />
              <span className="th-header__badge">3</span>
            </div>

            <div className="th-header__action-btn">
              <MessageSquare size={18} />
              <span className="th-header__dot" />
            </div>
          </div>

          <div className="th-header__divider" />

          <div
            className="th-header__user"
            onClick={() => setDropOpen(!dropOpen)}
            ref={dropdownRef}
          >
            <div className="th-header__avatar">
              {user?.avatar ? <img src={user.avatar} alt="avatar" /> : initials}

              <span className="th-header__status-online" />
            </div>

            <div className="th-header__user-info">
              <span className="th-header__name">
                {user?.fullName || user?.email}
              </span>

              <span className="th-header__role">
                {user?.role?.name || "Administrator"}
              </span>
            </div>

            <ChevronDown
              size={14}
              className={`th-header__chevron ${
                dropOpen ? "th-header__chevron--rotated" : ""
              }`}
            />

            {dropOpen && (
              <div className="th-header__dropdown">
                <div className="th-header__dropdown-welcome">
                  Xin chào,{" "}
                  <strong>{user?.fullName?.split(" ").pop() || "Admin"}</strong>{" "}
                  👋
                </div>

                <button
                  className="th-header__dropdown-item"
                  onClick={() => navigate("/profile")}
                >
                  <User size={14} />
                  <span>Hồ sơ cá nhân</span>
                </button>

                <button
                  className="th-header__dropdown-item"
                  onClick={() => navigate("/settings")}
                >
                  <Settings size={14} />
                  <span>Cài đặt hệ thống</span>
                </button>

                <div className="th-header__dropdown-divider" />

                <button
                  className="th-header__dropdown-item th-header__dropdown-item--logout"
                  onClick={handleLogout}
                  disabled={loading}
                >
                  <LogOut size={14} />
                  <span>{loading ? "Đang đăng xuất..." : "Đăng xuất"}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

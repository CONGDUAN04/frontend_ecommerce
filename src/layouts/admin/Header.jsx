import { useContext, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import { NotifyContext } from "../../contexts/notify.context.jsx";
import { logoutAPI } from "../../services/api.auth.js";
import {
  Search,
  Bell,
  MessageSquare,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import "../../styles/admin/header.css";
import { handleApiError, handleApiSuccess } from "../../utils/apiHandler.js";

const ROUTE_BREADCRUMB = {
  "/admin": ["Dashboard"],
  "/admin/product-groups": ["Nhóm sản phẩm"],
  "/admin/products": ["Nhóm sản phẩm", "Sản phẩm"],
  "/admin/products/variants": ["Nhóm sản phẩm", "Sản phẩm", "Biến thể"],
  "/admin/categories": ["Danh mục"],
  "/admin/brands": ["Thương hiệu"],
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

export default function Header({ toggleSidebar }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const { api } = useContext(NotifyContext);

  const [dropOpen, setDropOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const breadcrumb = useBreadcrumb(location.pathname);

  const parent =
    breadcrumb.length > 1 ? breadcrumb[breadcrumb.length - 2] : "Trang chủ";

  const current = breadcrumb[breadcrumb.length - 1];

  const handleLogout = async () => {
    if (loading) return;
    setLoading(true);

    try {
      await logoutAPI();

      localStorage.clear();
      setUser(null);

      handleApiSuccess(api, "Đăng xuất thành công!");
      setDropOpen(false);
      navigate("/");
    } catch (err) {
      handleApiError(api, err);
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
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <h1>{current}</h1>

          <div className="breadcrumb">
            {breadcrumb.map((item, index) => (
              <span
                key={index}
                className={index === breadcrumb.length - 1 ? "active" : ""}
              >
                {item}
                {index < breadcrumb.length - 1 && " / "}
              </span>
            ))}
          </div>
        </div>

        <div className="search-box">
          <Search size={14} />
          <input placeholder="Tìm kiếm..." />
        </div>

        <div className="header-actions">
          <div className="icon-btn">
            <Bell size={16} />
            <span className="badge">3</span>
          </div>

          <div className="icon-btn">
            <MessageSquare size={16} />
            <span className="dot" />
          </div>

          <div className="divider" />

          <div className="user" onClick={() => setDropOpen(!dropOpen)}>
            <div className="avatar">
              {user?.avatar ? <img src={user.avatar} alt="" /> : initials}
              <span className="online" />
            </div>

            <div className="user-info">
              <span className="name">{user?.fullName || user?.email}</span>
              <span className="role">{user?.role?.name}</span>
            </div>

            <ChevronDown size={14} className={dropOpen ? "rotate" : ""} />

            {dropOpen && (
              <div className="dropdown">
                <button onClick={() => navigate("/profile")}>
                  <User size={14} /> Hồ sơ
                </button>

                <button onClick={() => navigate("/settings")}>
                  <Settings size={14} /> Cài đặt
                </button>

                <div className="divider-line" />

                <button className="logout" onClick={handleLogout}>
                  <LogOut size={14} /> Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

import { useState, useEffect, useMemo, useContext } from "react";
import {
  Package,
  Users,
  ChevronRight,
  Menu,
  X,
  LayoutDashboard,
  Droplet,
  Tags,
  BadgeCheck,
  Boxes,
  ShieldCheck,
  Layers,
  Palette,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context.jsx";
import "../../styles/admin/sidebar.css";

const getActiveMenuFromPath = (path) => {
  const routeMap = {
    "/admin/product-groups": { menu: "product-groups", subMenu: null },
    "/admin/products": { menu: "product-groups", subMenu: "products" },
    "/admin/variants": { menu: "product-groups", subMenu: "variants" },
    "/admin/product-colors": {
      menu: "product-groups",
      subMenu: "product-colors",
    },
    "/admin/colors": { menu: "product-groups", subMenu: "colors" },
    "/admin/categories": { menu: "categories", subMenu: null },
    "/admin/brands": { menu: "brands", subMenu: null },
    "/admin/users": { menu: "users", subMenu: null },
    "/admin/roles": { menu: "roles", subMenu: null },
    "/admin/targets": { menu: "targets", subMenu: null },
  };

  const matched = routeMap[path] ||
    routeMap[
      Object.keys(routeMap)
        .sort((a, b) => b.length - a.length)
        .find((key) => path.startsWith(key))
    ] || { menu: "dashboard", subMenu: null };

  return matched;
};

export default function Sidebar({ isOpen, toggleSidebar }) {
  const location = useLocation();
  const { setUser } = useContext(AuthContext);

  const initialActive = getActiveMenuFromPath(location.pathname);
  const [activeMenu, setActiveMenu] = useState(initialActive.menu);
  const [activeSubMenu, setActiveSubMenu] = useState(initialActive.subMenu);

  const menuItems = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin",
      },
      {
        id: "product-groups",
        label: "Nhóm sản phẩm",
        icon: Boxes,
        path: "/admin/product-groups",
        subMenu: [
          {
            id: "products",
            label: "Sản phẩm",
            path: "/admin/products",
            icon: Package,
          },
          {
            id: "colors",
            label: "Màu sắc",
            path: "/admin/colors",
            icon: Palette,
          },
          {
            id: "product-colors",
            label: "Màu theo sản phẩm",
            path: "/admin/product-colors",
            icon: Droplet,
          },
          {
            id: "variants",
            label: "Biến thể",
            path: "/admin/variants",
            icon: Layers,
          },
        ],
      },
      {
        id: "categories",
        label: "Danh mục sản phẩm",
        icon: Tags,
        path: "/admin/categories",
      },
      { id: "users", label: "Người dùng", icon: Users, path: "/admin/users" },
      {
        id: "brands",
        label: "Thương hiệu",
        icon: BadgeCheck,
        path: "/admin/brands",
      },
      {
        id: "roles",
        label: "Phân quyền",
        icon: ShieldCheck,
        path: "/admin/roles",
      },
    ],
    [],
  );

  useEffect(() => {
    const matched = getActiveMenuFromPath(location.pathname);
    setActiveMenu(matched.menu);
    setActiveSubMenu(matched.subMenu);
  }, [location.pathname]);

  return (
    <aside
      className={`ts-sidebar ${isOpen ? "ts-sidebar--open" : "ts-sidebar--closed"}`}
    >
      {/* HEADER */}
      <div className="ts-sidebar__header">
        <div className="ts-sidebar__header-line"></div>

        <div className="ts-sidebar__brand">
          <div className="ts-sidebar__logo-box">T</div>
          {isOpen && (
            <div className="ts-sidebar__logo-text">
              <div className="ts-sidebar__logo-title">TeachPhone</div>
              <div className="ts-sidebar__logo-sub">Admin Panel</div>
            </div>
          )}
        </div>

        <button className="ts-sidebar__toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* NAVIGATION */}
      <nav className="ts-sidebar__nav">
        {isOpen && (
          <div className="ts-sidebar__section-title">
            <span className="ts-sidebar__section-dot"></span>
            MENU
          </div>
        )}

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          const hasSub = item.subMenu?.length > 0;

          return (
            <div key={item.id} className="ts-sidebar__item-wrapper">
              {/* MAIN ITEM */}
              <Link
                to={item.path}
                className={`ts-sidebar__item ${isActive ? "ts-sidebar__item--active" : ""}`}
                onClick={() => setActiveMenu(item.id)}
                title={!isOpen ? item.label : ""}
              >
                <Icon className="ts-sidebar__item-icon" size={20} />
                {isOpen && (
                  <span className="ts-sidebar__item-label">{item.label}</span>
                )}
                {isOpen && hasSub && (
                  <ChevronRight
                    size={16}
                    className={`ts-sidebar__arrow ${isActive ? "ts-sidebar__arrow--rotated" : ""}`}
                  />
                )}
              </Link>

              {/* SUB MENU */}
              {isOpen && hasSub && isActive && (
                <div className="ts-sidebar__submenu">
                  {item.subMenu.map((sub) => {
                    const SubIcon = sub.icon;
                    const activeSub = activeSubMenu === sub.id;

                    return (
                      <Link
                        key={sub.id}
                        to={sub.path}
                        className={`ts-sidebar__subitem ${activeSub ? "ts-sidebar__subitem--active" : ""}`}
                        onClick={() => setActiveSubMenu(sub.id)}
                      >
                        <SubIcon
                          size={16}
                          className="ts-sidebar__subitem-icon"
                        />
                        <span>{sub.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

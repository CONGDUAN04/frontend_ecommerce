import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./layouts/admin/Header.jsx";
import Sidebar from "./layouts/admin/Sidebar.jsx";
import GlobalSpin from "./components/common/admin/global.spin.jsx";
import "./styles/admin/admin-layout.css";

export default function AppAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <GlobalSpin>
      <div className="admin-layout">
        {sidebarOpen && (
          <div
            className="admin-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          isOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <div className="admin-content">
          <Header toggleSidebar={() => setSidebarOpen((v) => !v)} />

          <main className="admin-main">
            <Outlet />
          </main>
        </div>
      </div>
    </GlobalSpin>
  );
}

import { useEffect, useState } from "react";
import { fetchAllDashboardAPI } from "../../../services/api.dashboard.js";
import { message } from "antd";
import Dashboard from "./dashboard.jsx";

const DashboardPage = () => {
  const [dataDashboard, setDataDashboard] = useState([]);

  const loadDashboard = async () => {
    try {
      const res = await fetchAllDashboardAPI();

      if (res?.data) {
        setDataDashboard(res.data);
      } else {
        message.error("Không tải được dữ liệu Dashboard!");
      }
    } catch (err) {
      message.error("Có lỗi xảy ra!");
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return <Dashboard dataDashboard={dataDashboard} />;
};

export default DashboardPage;

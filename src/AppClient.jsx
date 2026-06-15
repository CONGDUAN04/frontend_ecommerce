import { Outlet } from "react-router-dom";
import Header from "./layouts/client/Header.jsx";
import Footer from "./layouts/client/footer.jsx";
import "./styles/client/layouts/client-layout.css";

const AppClient = () => {
  return (
    <div className="client-layout">
      <Header cartCount={2} />

      <main className="client-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default AppClient;

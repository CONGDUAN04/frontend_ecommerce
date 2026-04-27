import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "../src/index.css";

import AppAdmin from "./AppAdmin.jsx";
import AppClient from "./AppClient.jsx";
import HomePage from "./pages/admin/dashboard/index.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import CategoryPage from "./pages/admin/category/index.jsx";
import BrandPage from "./pages/admin/brand/index.jsx";
import LoginPage from "./pages/auth/login.jsx";
import RegisterPage from "./pages/auth/register.jsx";
import HomePageUser from "./pages/client/homepage.jsx";

import { AuthWrapper } from "./contexts/auth.context.jsx";
import NotifyProvider from "./contexts/notify.provider.jsx";
import LoadingProvider from "./contexts/loading.context.jsx";
import UserPage from "./pages/admin/user/index.jsx";
import RolePage from "./pages/admin/role/index.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyOtpPage from "./pages/auth/VerifyOTPPage.jsx";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AppAdmin />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: "categories", element: <CategoryPage /> },
      { path: "brands", element: <BrandPage /> },
      { path: "users", element: <UserPage /> },
      { path: "roles", element: <RolePage /> },
    ],
  },
  {
    path: "/",
    element: <AppClient />,
    children: [{ index: true, element: <HomePageUser /> }],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotifyProvider>
      <LoadingProvider>
        <AuthWrapper>
          <RouterProvider router={router} />
        </AuthWrapper>
      </LoadingProvider>
    </NotifyProvider>
  </React.StrictMode>,
);

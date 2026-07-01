import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "antd/dist/reset.css";
import "./toast.css";
import "./styles/client/base/global.css";
import { Toaster } from "react-hot-toast";
import AppAdmin from "./AppAdmin.jsx";
import AppClient from "./AppClient.jsx";
import HomePage from "./pages/admin/dashboard/index.jsx";
import AdminRoute from "./routes/AdminRoute.jsx";
import CategoryPage from "./pages/admin/category/index.jsx";
import BrandPage from "./pages/admin/brand/index.jsx";
import LoginPage from "./pages/auth/login.jsx";
import RegisterPage from "./pages/auth/register.jsx";
import HomePageUser from "./pages/client/home/page/HomePageUser.jsx";
import { CartProvider } from "./contexts/cart.context";
import { AuthWrapper } from "./contexts/auth.context.jsx";
import LoadingProvider from "./contexts/loading.context.jsx";
import UserPage from "./pages/admin/user/index.jsx";
import RolePage from "./pages/admin/role/index.jsx";
import ForgotPassword from "./pages/auth/ForgotPassword.jsx";
import ResetPassword from "./pages/auth/ResetPassword.jsx";
import VerifyOtpPage from "./pages/auth/VerifyOTPPage.jsx";
import ProductGroupPage from "./pages/admin/productGroup/index.jsx";
import ProductPage from "./pages/admin/product/index.jsx";
import VariantPage from "./pages/admin/variant/index.jsx";
import ColorPage from "./pages/admin/color/index.jsx";
import ProductColorPage from "./pages/admin/productColor/index.jsx";
import ProductDetailPage from "./pages/client/product-detail/page/ProductDetailPage.jsx";
import CartPage from "./pages/client/cart/page/CartPage.jsx";
import CheckoutPage from "./pages/client/checkout/page/CheckoutPage.jsx";
import OrderSuccessPage from "./pages/client/order-success/page/OrderSuccessPage.jsx";
import MyOrdersPage from "./pages/client/my-orders/page/MyOrdersPage.jsx";
import OrderDetailPage from "./pages/client/order-detail/page/OrderDetailPage.jsx";
import OrderPage from "./pages/admin/order/index.jsx";
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
      { path: "product-groups", element: <ProductGroupPage /> },
      { path: "products", element: <ProductPage /> },
      { path: "variants", element: <VariantPage /> },
      { path: "colors", element: <ColorPage /> },
      { path: "product-colors", element: <ProductColorPage /> },
      { path: "product-colors", element: <ProductColorPage /> },
      { path: "orders", element: <OrderPage /> },
    ],
  },
  {
    path: "/",
    element: <AppClient />,
    children: [
      {
        index: true,
        element: <HomePageUser />,
      },

      {
        path: "/product/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/my-orders/:id",
        element: <OrderDetailPage />,
      },
    ],
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
    <LoadingProvider>
      <AuthWrapper>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 1500,
            }}
          />
        </CartProvider>
      </AuthWrapper>
    </LoadingProvider>
  </React.StrictMode>,
);

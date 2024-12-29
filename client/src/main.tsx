import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "@/auth/Login.tsx";
import Signup from "@/auth/Signup.tsx";
import ForgotPassword from "@/auth/ForgotPassword.tsx";
import ResetPassword from "@/auth/ResetPassword.tsx";
import VerifyEmail from "@/auth/VerifyEmail.tsx";
import MainLayout from "@/layout/MainLayout";
import HeroSection from "@/components/HeroSection";
import Profile from "@/components/Profile";
import SearchPage from "@/components/SearchPage";
import DetailPage from "@/components/DetailPage";
import Cart from "@/components/Cart";
import Restaurant from "@/admin/Restaurant";
import AddMenu from "@/admin/AddMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:searchText",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <DetailPage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/admin/restaurant",
        element: <Restaurant />,
      },
      {
        path: "/admin/addmenu",
        element: <AddMenu />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
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
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

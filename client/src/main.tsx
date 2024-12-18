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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HeroSection />,
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

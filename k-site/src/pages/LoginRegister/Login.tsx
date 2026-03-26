import React from "react";
import LoginForm from "./components/LoginForm";
import Layout from "./components/Layout";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/utils/useAuth";

const Login = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/"} />;
  return <Layout Form={LoginForm} />;
};

export default Login;

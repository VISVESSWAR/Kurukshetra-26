import React from "react";
import RegisterForms from "./LoginRegister/components/RegisterForms";
import Layout from "./LoginRegister/components/Layout";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/utils/useAuth";

const Register = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to={"/"} />;
  return (
    <Layout Form={() => <RegisterForms />} backPath={"/login"} />
  );
};

export default Register;

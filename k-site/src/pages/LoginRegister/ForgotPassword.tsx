import React from "react";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import Layout from "./components/Layout";

const ForgotPassword = () => {
  return <Layout Form={() => <ForgotPasswordForm />} backPath={"/login"} />;
};

export default ForgotPassword;

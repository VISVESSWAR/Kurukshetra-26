import React from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";
import Layout from "./components/Layout";

const ResetPassword = () => {
  return <Layout Form={() => <ResetPasswordForm />} />;
};

export default ResetPassword;

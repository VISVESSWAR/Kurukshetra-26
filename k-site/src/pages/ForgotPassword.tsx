import ForgotPasswordForm from "./ForgotPassowordForm";
import Layout from "../components/Layout"; // Adjust path if Layout is elsewhere

const ForgotPassword = () => {
  return (
    <Layout 
      Form={ForgotPasswordForm} 
      backPath={"/login"} 
    />
  );
};

export default ForgotPassword;
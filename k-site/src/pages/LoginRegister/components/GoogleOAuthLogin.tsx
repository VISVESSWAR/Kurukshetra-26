import React from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/utils/useAuth";

const GoogleOAuthLogin = () => {
  const { handleGoogleOAuth } = useAuth();

  return (
    <GoogleLogin
      onSuccess={(credentials: CredentialResponse) => {
        if (credentials.credential) {
          handleGoogleOAuth({
            accessId: credentials.credential,
          });
        }
      }}
      onError={() => {
        toast.error("Error authenticating through Google OAuth");
      }}
    />
  );
};

export default GoogleOAuthLogin;

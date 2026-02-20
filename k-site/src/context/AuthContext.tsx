import {
  // createContext,
  useCallback,
  // useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useApp } from "./AppContext";
import {
  apiForgotPassword,
  apiGSignin,
  apiKLogin,
  apiKRegister,
  type RegisterResponse,
} from "../api/auth";

import { getErrorMessage } from "@/context/utils/auth_utils.ts";
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  GooglePayload,
  ForgotPasswordPayload,
} from "@/context/utils/auth_types.ts";
import { AuthContext } from "./AuthContextObject";

/* ========================= */


// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
}


const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: AuthUser }
  | { type: "LOGOUT" };

function reducer(
  state: AuthState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return initialState;

    default:
      return state;
  }
}

/* ========================= */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { refreshCaptcha, captchaToken } = useApp();
  const navigate = useNavigate();

  const DEFAULT_REDIRECT_PATH = "/";

  const handleKLogin = (data: LoginPayload) => {
    refreshCaptcha();

    toast.promise(
      apiKLogin({ ...data, captcha: captchaToken }),
      {
        loading: "Logging in...",
        success: (response: RegisterResponse) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.user,
          });
          navigate(DEFAULT_REDIRECT_PATH);
          return response.message;
        },
        error: (err) => getErrorMessage(err),
      },
    );
  };

  const handleKRegister = (data: RegisterPayload) => {
    refreshCaptcha();

    toast.promise(
      apiKRegister({ ...data, captcha: captchaToken }),
      {
        loading: "Creating account...",
        success: (response: RegisterResponse) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.user,
          });
          navigate(DEFAULT_REDIRECT_PATH);
          return response.message;
        },
        error: (err) => getErrorMessage(err),
      },
    );
  };

  const handleGoogleOAuth = (data: GooglePayload) => {
    refreshCaptcha();

    toast.promise(
      apiGSignin({ ...data, captcha: captchaToken }),
      {
        loading: "Signing in...",
        success: (response: RegisterResponse) => {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.user,
          });
          navigate(DEFAULT_REDIRECT_PATH);
          return response.message;
        },
        error: (err) => getErrorMessage(err),
      },
    );
  };

  const handleForgotPassword = (data: ForgotPasswordPayload) => {
    refreshCaptcha();

    toast.promise(
      apiForgotPassword({ ...data, captcha: captchaToken }),
      {
        loading: "Sending reset link...",
        success: (response: { message: string }) => {
          navigate("/");
          return response.message;
        },
        error: (err) => getErrorMessage(err),
      },
    );
  };

  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate(DEFAULT_REDIRECT_PATH);
  }, [navigate]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        handleKLogin,
        handleKRegister,
        handleGoogleOAuth,
        handleForgotPassword,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

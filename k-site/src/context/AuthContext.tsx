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
  apiResetPassword,
  type RegisterResponse,
  type GoogleAuthResponse,
} from "../api/auth";

import { getErrorMessage } from "@/context/utils/auth_utils.ts";
import type {
  AuthUser,
  LoginPayload,
  RegisterPayload,
  GooglePayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/context/utils/auth_types.ts";
import { AuthContext } from "./AuthContextObject";

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

function reducer(state: AuthState, action: AuthAction): AuthState {
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

    const loadingToast = toast.loading("Authenticating credentials...");

    apiKLogin({ ...data, captcha: captchaToken })
      .then((response: RegisterResponse & { redirectToRegister?: boolean }) => {
        if (response.redirectToRegister) {
          toast.dismiss(loadingToast);
          toast.error(response.message || "Account registration required.");
          navigate("/register");
          return;
        }

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.user,
        });
        toast.dismiss(loadingToast);
        toast.success(response.message || "Welcome back, authorized user.");
        navigate(DEFAULT_REDIRECT_PATH);
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        dispatch({ type: "LOGOUT" });
        toast.error(getErrorMessage(err));
      });
  };

  const handleKRegister = (data: RegisterPayload) => {
    refreshCaptcha();

    toast.promise(apiKRegister({ ...data, captcha: captchaToken }), {
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
    });
  };


  const handleGoogleOAuth = (data: GooglePayload) => {
    refreshCaptcha();

    const loadingToast = toast.loading("Authorizing identity...");

    apiGSignin({ ...data, captcha: captchaToken })
      .then(
        (
          response: GoogleAuthResponse & {
            redirect?: { path: string; state?: unknown };
          },
        ) => {
          toast.dismiss(loadingToast);
          // console.log("Google OAuth response:", response);
          if (response.redirect) {
            toast.error(
              response.message ||
                "Registration required to complete authentication.",
            );
            // console.log("Redirecting to:", response.redirect);
            navigate(response.redirect.path, {
              replace: true,
              state: response.redirect.state,
            });

            return;
          }
          if(!response.user) {
            toast.error(
              response.message ||
                "Authentication failed. No user data received.",
            );
            return;
          }
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response?.user,
          });

          toast.success(response.message || "Authentication successful.");

          navigate(DEFAULT_REDIRECT_PATH);
        },
      )
      .catch((err) => {
        toast.dismiss(loadingToast);
        dispatch({ type: "LOGOUT" });
        toast.error(getErrorMessage(err));
      });
  };

  const handleForgotPassword = (data: ForgotPasswordPayload) => {
    refreshCaptcha();

    toast.promise(apiForgotPassword({ ...data, captcha: captchaToken }), {
      loading: "Sending reset link...",
      success: (response: { message: string }) => {
        navigate("/");
        return response.message;
      },
      error: (err) => getErrorMessage(err),
    });
  };

  const handleResetPassword = (data: ResetPasswordPayload) => {
    refreshCaptcha();

    toast.promise(apiResetPassword({ ...data, captcha: captchaToken }), {
      loading: "Resetting password...",
      success: (response: { message: string }) => {
        navigate("/login");
        return response.message;
      },
      error: (err) => getErrorMessage(err),
    });
  };

  const handleLogout = useCallback(() => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logged out successfully");
    navigate(DEFAULT_REDIRECT_PATH);
  }, [navigate]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // Token exists, set authenticated state with minimal user info
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: "",
          name: "",
          email: "",
        },
      });
    } else {
      dispatch({ type: "LOGOUT" });
    }
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
        handleResetPassword,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

import Cookies from "js-cookie";
import api from "./axios";
import { AxiosError } from "axios";
import type {
  LoginPayload,
  RegisterPayload,
  GooglePayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "@/context/utils/auth_types";

const url = "/auth";

/* ---------- TYPES ---------- */

export interface AuthUser {
  id: string;
  name: string;
  email: string;
}

export interface RegisterResponse {
  message: string;
  token?: string;
  user: AuthUser;
}

export interface ApiError {
  message: string;
}

 export interface GoogleAuthResponse {
  message: string;
  token?: string;
  user?: AuthUser;
  redirect?: {
    path: string;
    state?: unknown;
  };
}
    

/* ---------- API FUNCTION ---------- */

export const apiKRegister = async (
  data: RegisterPayload & { captcha: string | null }
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      `${url}/register`,
      data
    );

    const { message, token, user } = response.data;

    if (token) {
      Cookies.set("token", token);
    }

    return { message, token, user };
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw { message: "Something went wrong" } as ApiError;
  }
};

export const apiKLogin = async (
  data: LoginPayload & { captcha: string | null }
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(`${url}/login`, data);

    const { message, token, user } = response.data;

    if (token) {
      Cookies.set("token", token);
    }

    return { message, token, user };
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw { message: "Something went wrong" } as ApiError;
  }
};

export const apiGSignin = async (
  data: GooglePayload & { captcha: string | null }
): Promise<GoogleAuthResponse> => {
  try {
    const response = await api.post<GoogleAuthResponse>(
      `${url}/gsignin`,
      data
    );

    const { message, redirect, token, user } = response.data;

    if (token) {
      Cookies.set("token", token);
    }

    return { message, redirect, token, user };
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw { message: "Something went wrong" } as ApiError;
  }
};

export const apiForgotPassword = async (
  data: ForgotPasswordPayload & { captcha: string | null }
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      `${url}/forgot-password`,
      data
    );

    return { message: response.data.message };
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw { message: "Something went wrong" } as ApiError;
  }
};

export const apiResetPassword = async (
  data: ResetPasswordPayload & { captcha: string | null }
): Promise<{ message: string }> => {
  try {
    const response = await api.post<{ message: string }>(
      `${url}/reset-password`,
      data
    );

    return { message: response.data.message };
  } catch (err) {
    const error = err as AxiosError<ApiError>;

    if (error.response?.data) {
      throw error.response.data;
    }

    throw { message: "Something went wrong" } as ApiError;
  }
};
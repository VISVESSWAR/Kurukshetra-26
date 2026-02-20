import Cookies from "js-cookie";
import api from "./axios";
import { AxiosError } from "axios";

const url = "/auth";

/* ---------- TYPES ---------- */

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  captcha: string | null;
}

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

export type LoginPayload = Record<string, unknown>;
export type AuthPayload = Record<string, unknown>;

/* ---------- API FUNCTION ---------- */

export const apiKRegister = async (
  data: RegisterPayload
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

export const apiKLogin = async (data: LoginPayload): Promise<RegisterResponse> => {
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

export const apiGSignin = async (data: AuthPayload): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>(
      `${url}/google-signin`,
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

export const apiForgotPassword = async (data: AuthPayload): Promise<{ message: string }> => {
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

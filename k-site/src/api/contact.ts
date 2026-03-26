import api from "./axios";
import { AxiosError } from "axios";

const url = "/mail";

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export const apiKQueryMail = async (data: Record<string, unknown>) => {
  try {
    const response = await api.post(`${url}/query`, data);
    const { message } = response.data;
    return { message };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

export const apiKCollaborateMail = async (data: Record<string, unknown>) => {
  try {
    const response = await api.post(`${url}/collaborate`, data);
    const { message } = response.data;
    return { message };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;  }
};
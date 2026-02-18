import Cookies from "js-cookie";
import api from "./axios";

const url = "/auth";

export const apiKRegister = async (data: any) => {
  try {
    let response = await api.post(`${url}/register`, data);

    const { message, token, user } = response.data;

    if (token) Cookies.set("token", token);

    return { message, token, user };

  } catch (err: any) {
    if (err?.response) throw err.response.data;
    throw err;
  }
};

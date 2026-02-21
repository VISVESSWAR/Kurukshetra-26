import api from "./axios";
import { AxiosError } from "axios";

const url = "/events";
const technovationUrl = `${url}/technovation/register`;
const paymentUrl = `${url}/payment`;

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

// get user registrations

export const apiKUserEvents = async () => {
  try {
    const response = await api.get(`${url}`);

    const { message, registrations, user } = response.data;

    return { message, registrations, user };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// register technovation

export const apiRegisterTechnovation = async (data: Record<string, unknown>) => {
  try {
    await api.post(`${technovationUrl}`, data);
    return {
      message: "Registered for technovation successfully!!",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// get technovation registration

export const apiGetTechnovation = async () => {
  try {
    const response = await api.get(`${url}/technovation`);
    const { registered } = response.data;
    return { registered };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// register events

export const apiRegisterEvents = async (eventCode: string, data: Record<string, unknown>) => {
  try {
    await api.post(`${url}/register/${eventCode}`, data);
    return {
      message: "Registered for event successfully!!",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// register workshop

export const apiRegisterWorkshop = async (workshopCode: string, data: Record<string, unknown>) => {
  try {
    await api.post(`${url}/register/${workshopCode}`, data);
    return {
      message: "Registered for workshop successfully!!",
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// submit reference id

export const apiPutReferenceID = async (code: string, data: Record<string, unknown>) => {
  try {
    const response = await api.put(`${paymentUrl}/${code}`, data);
    return {
      message: response.data.message,
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// accomodation registration

export const apiRegisterAccommodation = async (data: Record<string, unknown>) => {
  try {
    console.log(data);
    
    const response = await api.post(`${url}/accomodation/register`, data);
    return {
      message: response.data.message,
    };
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};

// get accomodation registration

export const apiGetAccommodation = async () => {
  try {
    const response = await api.get(`${url}/accomodation`);
    const { registered, registrations } = response.data;
    
    console.log(response.data);
    return {
      registered,
      isPaid: registrations.isPaid,
      payid: registrations.payid ? true : false,
    };
    
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    if (error.response) throw error.response.data;
    throw error;
  }
};
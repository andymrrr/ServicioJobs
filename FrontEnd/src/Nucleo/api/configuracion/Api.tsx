import axios, { AxiosInstance } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

const crearApiInstance = (contentType: string): AxiosInstance => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      "Content-Type": contentType,
      Accept: "application/json",
    },
  });
};

export const Api = crearApiInstance("application/json");
export const ApiConArchivo = crearApiInstance("multipart/form-data");

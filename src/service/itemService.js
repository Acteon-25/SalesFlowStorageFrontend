import axios from "axios";
import { API_BASE_URL } from "../config.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getItems = async () => {
  try {
    const response = await api.get("/item");
    return response.data;
  } catch (error) {
    return manejarError(error);
  }
};
const manejarError = (error) => {
  if (error.response) {
    return { message: error.response.data };
  }
  return { message: "Error de conexión con el servidor" };
};

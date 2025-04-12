import axios from "axios";
import { API_BASE_URL } from "../config.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const register = async (datos) => {
  try {
    const response = await api.post("/auth/register", datos);
    return response.data;
  } catch (error) {
    return manejarError(error);
  }
};

export const login = async (datos) => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const response = await api.post("/auth/login", datos, {
      headers: { Timezone: timezone },
    });

    return response.data;
  } catch (error) {
    return manejarError(error);
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    return manejarError(error);
  }
};

export const profile = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response.data;
  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      throw new Error("No autorizado");
    }
    return manejarError(error);
  }
};

const manejarError = (error) => {
  if (error.response) {
    return { message: error.response.data.message };
  }
  if (error.request) {
    return { message: "Error de conexión con el servidor" };
  }
  return { message: error.message || "Error desconocido" };
};

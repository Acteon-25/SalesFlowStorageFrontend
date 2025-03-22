import axios from "axios";
import { format } from "date-fns";
import { API_BASE_URL } from "../config.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getSales = async (range = {}) => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { start, end } = range;
  const params = {};

  if (start && end) {
    params.startDate = format(start, "yyyy-MM-dd");
    params.endDate = format(end, "yyyy-MM-dd");
  }

  try {
    const response = await api.get("/sale", {
      headers: { timezone },
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);

    return [
      {
        message:
          error.response?.data?.message ||
          "Error de conexión con el servidor",
      },
    ];
  }
};


export const createSale = async (datos) => {
  try {
    const response = await api.post("/sale", datos);
    return response.data;
  } catch (error) {
    return manejarError(error);
  }
};

export const deleteSale = async (id) => {
  try {
    const response = await api.delete(`/sale/${id}`);
    return response.data;
  } catch (error) {
    manejarError(error);
    throw error;
  }
};


const manejarError = (error) => {
  if (error.response) {
    return { message: error.response.data };
  }
  return { message: "Error de conexión con el servidor" };
};

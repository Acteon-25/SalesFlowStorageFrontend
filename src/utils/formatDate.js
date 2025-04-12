import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatearFecha(fechaIso) {
  const fecha = new Date(fechaIso);
  const fechaFormateada = format(fecha, "dd MMM yyyy - HH:mm", { locale: es });

  return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
}
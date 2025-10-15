import { format } from "date-fns";
import { es } from "date-fns/locale";

export function formatearFecha(fechaIso) {
  try {
    if (!fechaIso) return 'Sin fecha';
    
    // Crear el objeto Date
    const fecha = new Date(fechaIso);
    
    // Verificar si es una fecha válida
    if (isNaN(fecha.getTime())) {
      console.error('Fecha inválida:', fechaIso);
      return 'Fecha inválida';
    }
    
    // Formatear usando date-fns (automáticamente usa la zona horaria local del navegador)
    const fechaFormateada = format(fecha, "dd MMM yyyy - HH:mm", { locale: es });

    return fechaFormateada.charAt(0).toUpperCase() + fechaFormateada.slice(1);
  } catch (error) {
    console.error('Error formateando fecha:', error, 'Fecha recibida:', fechaIso);
    return 'Error en fecha';
  }
}
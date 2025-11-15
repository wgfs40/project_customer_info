const FormatDate = (dateInput: string | Date | undefined) => {
  // 1. Verificar si hay valor antes de intentar la conversión
  if (!dateInput) {
    return "N/A";
  }

  // 2. Intentar crear un objeto Date
  const dateObject = new Date(dateInput);

  // 3. Verificar si el objeto Date es válido
  if (isNaN(dateObject.getTime())) {
    return "Fecha Inválida";
  }

  // 4. Formatear y devolver
  return dateObject.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default FormatDate;

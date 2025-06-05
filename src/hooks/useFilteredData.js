// hooks/useFilteredData.js
import { useMemo } from "react";

export function useFilteredData(data, { pabellon = "Todos", month = "Todos", year = "Todos" }) {
  return useMemo(() => {
    return data.filter(item => {
      const fecha = new Date(item.evento.tiempoInicial);
      const mes = fecha.getMonth() + 1;
      const año = fecha.getFullYear();

      const coincideMes = month === "Todos" || parseInt(month) === mes;
      const coincideAño = year === "Todos" || parseInt(year) === año;
      const coincidePabellon = pabellon === "Todos" || item.evento.pabellon === pabellon;

      return coincideMes && coincideAño && coincidePabellon;
    });
  }, [data, pabellon, month, year]);
}

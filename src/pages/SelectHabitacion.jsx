import UserTable from "../components/TableUser";
import BaseLayout from "../components/BaseLayout";
import { useData } from "../context/DataContext";
import MetricCard from "../components/MetricCard";
import PieChartCard from "../components/CircularCards";
import BarChartCard from "../components/BarrasCard";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useFilteredData } from "../hooks/useFilteredData";
import FiltroSelect from "../components/FiltroSelect";
import BarChartTimerCard from "../components/BarraTimerCard";
import GraficoAtencionTiempo from "../components/AtencionTiempoCard";



const SelectHabitacion = () => {

  const navigate = useNavigate();

  const { data, loading, error } = useData();

  const [selectedCama, setSelectedCama] = useState("Todos");
  const [selectedMonth, setSelectedMonth] = useState("Todos");
  const [selectedYear, setSelectedYear] = useState("Todos");

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  console.log('Total registros:', data.length);
  console.log('Ejemplo:', data[0]);

  const handleClick = () => {
    navigate("/"); // Cambia esto por la ruta a la que deseas ir
  };



  // Extraer lista única de camas
  const camasUnicas = [...new Set(data.map((item) => item.evento.pabellon))];
  const añosUnicos = [...new Set(data.map((item => new Date(item.evento.tiempoInicial).getFullYear())))];

  console.log("Años ", añosUnicos)

  // Filtrar por cama si se ha seleccionado una específica
  // const dataFiltrada = selectedCama === "Todas"
  //   ? data
  //   : data.filter((item) => item.evento.pabellon === selectedCama);


  // const dataFiltrada = useMemo(() => {
  // return data.filter(item => {
  //   const fecha = new Date(item.evento.tiempoInicial);
  //   const mes = fecha.getMonth() + 1; // 0-11 => 1-12
  //   const año = fecha.getFullYear();

  //   const coincideMes = selectedMonth === "Todos" || parseInt(selectedMonth) === mes;
  //   const coincideAño = selectedYear === "Todos" || parseInt(selectedYear) === año;
  //   const coincideCama = selectedCama === "Todos" || item.evento.pabellon === selectedCama;

  //   return coincideMes && coincideAño && coincideCama;
  // });
  // }, [data, selectedCama, selectedMonth, selectedYear]);

  const dataFiltrada = useFilteredData(data, {
    pabellon: selectedCama,
    month: selectedMonth,
    year: selectedYear
  });

  console.log("Filtrada", dataFiltrada)
  // Conteo por tipo
  const conteoPorTipo = dataFiltrada.reduce((acc, item) => {
    acc[item.evento.tipo] = (acc[item.evento.tipo] || 0) + 1;
    return acc;
  }, {});

  const conteoPorTiempo = dataFiltrada.reduce((acc, item) => {
    if (!acc[item.evento.tipo]) {
      acc[item.evento.tipo] = { total: 0, count: 0 };
    }
    acc[item.evento.tipo].total += item.tiempoTotalMinutos;
    acc[item.evento.tipo].count += 1;
    return acc;
  }, {});

  console.log("Conteo por tiempo", conteoPorTiempo)

  // Paso 3: Convertir a array para el gráfico, calculando el promedio
  const chartDataTime = Object.entries(conteoPorTiempo)
    .filter(([name]) => name !== "Cancelar,Azul")
    .map(([color, stats]) => ({
      name: color,
      value: stats.total / stats.count,
    }));


  const datosFiltrados = Object.entries(conteoPorTipo)
    .filter(([name]) => name !== "Cancelar,Azul") // ❌ Excluir este tipo
    .map(([name, value]) => ({ name, value }));


  // console.log("conteo", datosFiltrados);

  // Llamados por pabellón
  const llamadosPorCama = dataFiltrada.reduce((acc, item) => {
    const cama = item.evento.cama;
    acc[cama] = (acc[cama] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(llamadosPorCama)
    .map(([name, count]) => ({ name: `Cama ${name}`, llamados: count }))
    .sort((a, b) => b.llamados - a.llamados)
    .slice(0, 5); // top 5


  const tiempoUmbral = 10; // minutos

  // Separar eventos a tiempo y fuera de tiempo
  const eventosAtendidosATiempo = dataFiltrada.filter(
    (e) => e.tiempoTotalMinutos <= tiempoUmbral
  );

  const eventosFueraDeTiempo = dataFiltrada.filter(
    (e) => e.tiempoTotalMinutos > tiempoUmbral
  );

  const atendidos = eventosAtendidosATiempo.length
  const tarde = eventosFueraDeTiempo.length


  // console.log("Total de eventos:", dataFiltrada.length);
  // console.log("Atendidos a tiempo:", atendidos);
  // console.log("Fuera de tiempo:", tarde);


  return (
    <BaseLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">


        {/* Topbar + Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-md">
          <h2 className="text-xl font-semibold">Análisis por Habitación 🖼️</h2>
          <button onClick={handleClick} className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-md">Anterior</button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">

          <FiltroSelect
            label="Seleccionar Dependencia"
            value={selectedCama}
            onChange={setSelectedCama}
            opciones={camasUnicas}
          />

          <FiltroSelect
            label="Seleccionar Mes"
            value={selectedMonth}
            onChange={setSelectedMonth}
            opciones={meses.map((mes, idx) => ({ value: idx + 1, label: mes }))}
          />

          <FiltroSelect
            label="Seleccionar Año"
            value={selectedYear}
            onChange={setSelectedYear}
            opciones={añosUnicos}
          />

        </div>

        {/* Topbar + Welcome */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
          {["Amarillo", "Azul", "Verde", "Rojo"].map((color) => (
            <MetricCard key={color} color={color} count={conteoPorTipo[color] || 0} />
          ))}
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard title="Llamados por Colores" data={datosFiltrados} />
          <GraficoAtencionTiempo atendidos={atendidos} tarde={tarde} titulo="Eventos Verdes Atendidos" />
            {/* <BarChartCard title="Camas con más llamados" data={barData} /> */}
          <BarChartTimerCard title="Tiempo Promedio " data={chartDataTime} xAxisLabel="Colores"
            yAxisLabel="Tiempo (Min)" />
        </div>

        <div className="mb-6">
          <UserTable title="Tabla de Usuarios" data={dataFiltrada} />
        </div>
      </div>
    </BaseLayout>
  );
};

export default SelectHabitacion;

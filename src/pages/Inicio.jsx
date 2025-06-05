import UserTable from "../components/TableUser";
import BaseLayout from "../components/BaseLayout";
import { useData } from "../context/DataContext";
import MetricCard from "../components/MetricCard";
import PieChartCard from "../components/CircularCards";
import BarChartCard from "../components/BarrasCard";
import { useNavigate } from "react-router-dom";
import { useFilteredData } from "../hooks/useFilteredData";
import { useState } from "react";
import FiltroSelect from "../components/FiltroSelect";
// import GraficoPromedioPorColor from "../components/GraficoPromedio";
import BarChartTimerCard from "../components/BarraTimerCard";
// import LineChartCard from "../components/LineaCArd";
import GraficoLlamadosPorMes from "../components/GraficoLlamadoMes";
import GraficotiempoMes from "../components/GraficoTiempoMes";

const Inicio = () => {

  const navigate = useNavigate();
  const [selectedMonth1, setSelectedMonth] = useState("Todos");
  const [selectedYear1, setSelectedYear] = useState("Todos");
  const [pabellonesSeleccionados, setPabellonesSeleccionados] = useState([]);


  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const handleClick = () => {
    navigate("/analytics"); // Cambia esto por la ruta a la que deseas ir
  };

  const { data, loading, error } = useData();
  console.log("datos", data[0])

  const añosUnicos = [...new Set(data.map((item => new Date(item.evento.tiempoInicial).getFullYear())))];
  const dataFiltrada = useFilteredData(data, { month: selectedMonth1, year: selectedYear1 })
  const pabellonesUnicos = [...new Set(data.map(item =>item.evento.pabellon))];


  // Conteo por tipo
  const conteoPorTipo = dataFiltrada.reduce((acc, item) => {
    acc[item.evento.tipo] = (acc[item.evento.tipo] || 0) + 1;
    return acc;
  }, {});

  console.log("Conteo por tipo", conteoPorTipo)


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

  console.log("conteo", datosFiltrados);

  // Llamados por pabellón
  const llamadosPorPabellon = dataFiltrada.reduce((acc, item) => {
    const pab = item.evento.pabellon;
    acc[pab] = (acc[pab] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.entries(llamadosPorPabellon)
    .map(([name, count]) => ({ name, llamados: count }))
    .sort((a, b) => b.llamados - a.llamados)
    .slice(0, 5); // top 5

  //Agrupar por Mes
  // const llamadosPorMes = dataFiltrada.reduce((acc, item) => {
  //   const fecha = new Date(item.evento.tiempoInicial);
  //   const key = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;

  //   acc[key] = (acc[key] || 0) + 1;
  //   return acc;
  // }, {});

  // const dataMensual = Object.entries(llamadosPorMes).map(([key, total]) => ({
  //   fecha: key,
  //   Total: total
  // }));

  // console.log('llamdosporMes', dataMensual)

  const togglePabellon = (pabellon) => {
  setPabellonesSeleccionados((prev) =>
    prev.includes(pabellon)
      ? prev.filter((p) => p !== pabellon)
      : [...prev, pabellon]
  );
};

  return (
    <BaseLayout>
     <div className="overflow-x-auto">

   
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">


        {/* Topbar + Welcome */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-6 text-white shadow-md">
          <h2 className="text-xl font-semibold"> PANEL DE ANÁLISIS POR HABITACIÓN 👋</h2>
          {/* <p className="text-sm">Analiza por habitación</p> */}
          <button onClick={handleClick} className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-md">Ir</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">

          <FiltroSelect
            label="Seleccionar Mes"
            value={selectedMonth1}
            onChange={setSelectedMonth}
            opciones={meses.map((mes, idx) => ({ value: idx + 1, label: mes }))}
          />

          <FiltroSelect
            label="Seleccionar Año"
            value={selectedYear1}
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
        <div className="overflow-x-auto w-full">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard title="Llamados por Colores" data={datosFiltrados} showLabel={false} loading />
          <BarChartCard title="Dependencias con más llamados" data={barData} />
          {/* <PieChartCard title="Llamados por Colores" data={chartDataTime} showLabel={true} /> */}
          <BarChartTimerCard title="Tiempo Promedio " data={chartDataTime} xAxisLabel="Colores"
            yAxisLabel="Tiempo (Min)" />
        </div>
        </div>
        {/* <LineChartCard title=
        "Llamados por Mes" data={dataMensual} xAxisKey="fecha" yAxisKey="Total"
          meses={meses} /> */}

<div className="overflow-x-auto w-full">

          <GraficoLlamadosPorMes
        data={dataFiltrada}
        titulo="Llamados Mensuales por Dependencia"
        tipoGrafico="conteo"
      />
</div>
          <GraficotiempoMes
        data={dataFiltrada}
        titulo="Tiempo Promedio de Llamados"
        tipoGrafico="promedio"
      />

        <div className="mb-6">
          <UserTable title="Tabla de Usuarios" data={dataFiltrada} />
        </div>
      </div>
        </div>
    </BaseLayout>
  );
};

export default Inicio;

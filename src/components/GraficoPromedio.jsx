// // components/GraficoPromedioPorColor.jsx
// import React from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';

// // Asignación de colores a tipos
// const COLORS = {
//   Verde: '#22c55e',
//   Azul: '#3b82f6',
//   Amarillo: '#facc15',
//   Rojo: '#ef4444',
// };

// const calcularPromedioPorColor = (eventos) => {
//   const agrupados = {};

//   eventos.forEach(({ tipo, tiempoTotalMinutos }) => {
//     if (!tipo || typeof tiempoTotalMinutos !== 'number') return;

//     const clave = tipo.trim(); // elimina espacios en blanco

//     if (!agrupados[clave]) {
//       agrupados[clave] = { total: 0, cantidad: 0 };
//     }

//     agrupados[clave].total += tiempoTotalMinutos;
//     agrupados[clave].cantidad += 1;
//   });

//   return Object.entries(agrupados).map(([tipo, { total, cantidad }]) => ({
//     tipo,
//     promedio: parseFloat((total / cantidad).toFixed(2)),
//   }));
// };


// const GraficoPromedioPorColor = ({ eventos }) => {
//   if (!eventos || eventos.length === 0) {
//     return <p className="text-gray-600">No hay datos disponibles para mostrar el gráfico.</p>;
//   }

//   const datosPromedio = calcularPromedioPorColor(eventos);

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-md mt-6 w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-semibold mb-4 text-gray-800">Promedio de Tiempo por Color (minutos)</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={datosPromedio}
//             dataKey="promedio"
//             nameKey="tipo"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             label
//           >
//             {datosPromedio.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={COLORS[entry.tipo] || '#a3a3a3'} />
//             ))}
//           </Pie>
//           <Tooltip />
//           <Legend />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default GraficoPromedioPorColor;

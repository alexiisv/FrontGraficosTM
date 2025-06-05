// // src/components/LineChartCard.jsx
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
//   CartesianGrid,
//   Label,
// } from "recharts";

// const COLORS = {
//   Total: "#3b82f6",      // Azul
// //   Total: "#22c55e",      // Verde
// //   Tardío: "#eab308",     // Amarillo
// //   "No Atendido": "#ef4444", // Rojo
// };

// const LineChartCard = ({ title, data, xAxisKey = "fecha" }) => {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow-md">
//       <h3 className="text-md font-semibold mb-4">{title}</h3>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey={xAxisKey} angle={-45} textAnchor="end" interval={0} height={60}>
//             <Label value="Fecha" offset={-20} position="insideBottom" />
//           </XAxis>
//           <YAxis>
//             <Label
//               value="Cantidad"
//               angle={-90}
//               position="insideLeft"
//               style={{ textAnchor: "middle" }}
//             />
//           </YAxis>
//           <Tooltip formatter={(value) => value.toLocaleString()} />
//           <Legend />
//           {Object.keys(COLORS).map((key) => (
//             <Line
//               key={key}
//               type="monotone"
//               dataKey={key}
//               stroke={COLORS[key]}
//               strokeWidth={2}
//               dot={{ r: 3 }}
//               activeDot={{ r: 5 }}
//             />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default LineChartCard;

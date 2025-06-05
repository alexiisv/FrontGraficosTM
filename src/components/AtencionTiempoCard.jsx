import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import { CircularProgress } from "@mui/material";

const COLORS = ["#0ea5e9", "#f59e0b"];

export default function GraficoAtencionTiempo({
  atendidos = 0,
  tarde = 0,
  titulo = "Tiempo de atención"
}) {
  const data = [
    { name: "A TIEMPO", value: atendidos },
    { name: "TARDE", value: tarde }
  ];

  const renderLabel = ({ name, value, percent }) =>
    // `${value} (${(percent * 100).toFixed(1)}%)`;
    `(${(percent * 100).toFixed(1)}%)`;

      const isLoading = atendidos === 0 && tarde === 0;


  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-md font-semibold mb-4">
        {titulo}
      </h3>
      {isLoading ? (
              <div className="flex justify-center items-center h-[200px]">
                <CircularProgress />
              </div>
            ) : (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={75}
            innerRadius={40}
            label={renderLabel}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name, props) => [`${value}`, name]}
            labelFormatter={() => ""}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
            )}
    </div>
  );
}

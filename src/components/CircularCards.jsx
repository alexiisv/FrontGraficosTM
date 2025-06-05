// src/components/PieChartCard.jsx
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { CircularProgress } from "@mui/material";


const COLOR_MAP = {
  Azul: "#3b82f6",
  Amarillo: "#facc15",
  Verde: "#4ade80",
  Rojo: "#ef4444",
};

const PieChartCard = ({ title, data, label }) => {
  // const labelFormatter =
  //   typeof label === "function"
  //     ? label
  //     : ({ name, value }) => `${value.toFixed(1)}`;
  const isLoading = !data || data.length === 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-md font-semibold mb-4">{title}</h3>
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
              innerRadius={45}
              outerRadius={75}
              fill="#8884d8"
              dataKey="value"
              // label={labelFormatter}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLOR_MAP[entry.name] || "#ccc"} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name, props) => {
                // return [`${value} (${percent}%)`, name];
                return [`${value}`, name];
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default PieChartCard;

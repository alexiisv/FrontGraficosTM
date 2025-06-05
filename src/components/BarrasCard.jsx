// src/components/BarChartCard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const BarChartCard = ({ title, data, loading }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-md font-semibold mb-4">{title}</h3>
        {loading && <CircularProgress />}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 15 }} />
          <Tooltip />
          <Bar dataKey="llamados" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;

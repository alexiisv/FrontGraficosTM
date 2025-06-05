// src/components/BarChartTimerCard.jsx
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend, LabelList,
    Label,
} from "recharts";
import { CircularProgress } from "@mui/material";

const DEFAULT_COLORS = {
   Verde: "#4ade80",   // verde
    Azul: "#3b82f6",    // azul
    Amarillo: "#facc15", // amarillo
    Rojo: "#ef4444",    // rojo
    // Puedes agregar más si es necesario
};

const BarChartTimerCard = ({
    title,
    data,
    dataKey = "value",
    nameKey = "name",
    xAxisLabel = "Categoría",
    yAxisLabel = "Cantidad",
    // colors = DEFAULT_COLORS,
}) => {
    
      const isLoading = !data || data.length === 0;

    return (

        <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-md font-semibold mb-4">{title}</h3>
            {isLoading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress />
        </div>
      ) : (
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                    <XAxis dataKey={nameKey} tick={{ fontSize: 12 }}>
                        <Label value={xAxisLabel} offset={-10} position="insideBottom" />
                    </XAxis>
                    <YAxis tick={{ fontSize: 12 }}>
                        <Label
                            value={yAxisLabel}
                            angle={-90}
                            position="insideLeft"
                            style={{ textAnchor: "middle" }}
                        />
                    </YAxis>
                    <Tooltip
                        formatter={(value) => value.toLocaleString()}
                        cursor={{ fill: "rgba(0,0,0,0.05)" }}
                    />
                    {/* <Legend /> */}
                    <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
                        <LabelList
                            dataKey={dataKey}
                            position="top"
                            formatter={(value) => value.toLocaleString()}
                        />
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} 
                                fill={DEFAULT_COLORS[entry[nameKey]] || "#a3a3a3"} // gris por defecto
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
      )}
        </div>
    );
};

export default BarChartTimerCard;

// const BarChartTimerCard = ({ title, data, dataKey = "value", nameKey = "name", colors = DEFAULT_COLORS }) => {
//     return (
//         <div className="bg-white p-6 rounded-xl shadow-md">
//             <h3 className="text-md font-semibold mb-4">{title}</h3>
//             <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
//                     <XAxis dataKey={nameKey} tick={{ fontSize: 12 }} />
//                     <YAxis tick={{ fontSize: 12 }} />
//                     <Tooltip
//                         formatter={(value) => value.toLocaleString()}
//                         cursor={{ fill: "rgba(0,0,0,0.05)" }}
//                     />
//                     <Legend />
//                     <Bar dataKey={dataKey} radius={[8, 8, 0, 0]}>
//                         {data.map((entry, index) => (
//                             <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
//                         ))}
//                     </Bar>
//                 </BarChart>
//             </ResponsiveContainer>
//         </div>
//     );
// };

// export default BarChartTimerCard;

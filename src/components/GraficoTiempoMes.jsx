import { useState, useMemo, useEffect } from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from "recharts";

const colores = ["Todos", "Rojo", "Amarillo", "Azul", "Verde"];

export default function GraficoTiempoPromedioMes({
    data = [],
    titulo = "Promedio de tiempo por mes y pabellón"
}) {
    const [pabellonesSeleccionados, setPabellonesSeleccionados] = useState([]);
    const [colorSeleccionado, setColorSeleccionado] = useState("Verde");

    const pabellonesUnicos = useMemo(() => {
        return [...new Set(data.map(d => d.evento.pabellon))];
    }, [data]);

    useEffect(() => {
        setPabellonesSeleccionados(pabellonesUnicos);
    }, [pabellonesUnicos]);

    // Agrupar por mes y pabellón, calcular promedio de tiempo
    const datosFiltrados = useMemo(() => {
        const conteo = {}; // { [mes]: { [pabellon]: { suma: x, cantidad: y } } }

        data.forEach(d => {
            const e = d.evento;
            const mes = new Date(e.tiempoInicial).toISOString().slice(0, 7);
            if (colorSeleccionado !== "Todos" && e.tipo !== colorSeleccionado) return;
            if (!pabellonesSeleccionados.includes(e.pabellon)) return;

            if (!conteo[mes]) conteo[mes] = {};
            if (!conteo[mes][e.pabellon]) conteo[mes][e.pabellon] = { suma: 0, cantidad: 0 };

            conteo[mes][e.pabellon].suma += d.tiempoTotalMinutos;
            conteo[mes][e.pabellon].cantidad += 1;
        });

        return Object.entries(conteo).map(([mes, valores]) => {
            const entrada = { mes };
            let sumaTotal = 0;
            let totalEventos = 0;

            for (const [pab, { suma, cantidad }] of Object.entries(valores)) {
                const promedio = cantidad > 0 ? suma / cantidad : 0;
                entrada[pab] = Number(promedio.toFixed(2));
                sumaTotal += suma;
                totalEventos += cantidad;
            }

            if (colorSeleccionado === "Todos") {
                entrada.total = totalEventos > 0 ? Number((sumaTotal / totalEventos).toFixed(2)) : 0;
            }

            return entrada;
        });
    }, [data, pabellonesSeleccionados, colorSeleccionado]);

    const togglePabellon = (pabellon) => {
        setPabellonesSeleccionados(prev =>
            prev.includes(pabellon)
                ? prev.filter(p => p !== pabellon)
                : [...prev, pabellon]
        );
    };

    return (
        <div style={{ padding: "1rem" }}>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200 w-full">
                <div className="mb-4">
                    <label>
                        <strong className="ml-75">Color:</strong>{" "}
                        <select
                            value={colorSeleccionado}
                            onChange={(e) => setColorSeleccionado(e.target.value)}
                            className="bg-indigo-100 mt-1 max-w-xs pl-10 pr-8 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {colores.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <h2 className="text-xl font-semibold text-gray-800 mb-6">{titulo}</h2>
                <div className="flex flex-col md:flex-row gap-6 items-start w-full">
                    <div className="w-full md:w-64 bg-white rounded-2xl shadow-lg p-2 border border-gray-200">
                        <div className="flex flex-col gap-1">
                            {pabellonesUnicos.map((pab) => (
                                <label
                                    key={pab}
                                    className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                                >
                                    <input
                                        type="checkbox"
                                        checked={pabellonesSeleccionados.includes(pab)}
                                        onChange={() => togglePabellon(pab)}
                                        className="accent-blue-600 w-4 h-4"
                                    />
                                    <span className="text-gray-700">{pab}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart data={datosFiltrados} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="mes" angle={-45} textAnchor="end" interval={0} height={60} />
                            <YAxis label={{ value: 'Minutos', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            {pabellonesSeleccionados.map((pab, index) => (
                                <Line
                                    key={pab}
                                    type="monotone"
                                    dataKey={pab}
                                    stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                                    strokeWidth={2}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 5 }}
                                />
                            ))}
                            {colorSeleccionado === "Todos" && (
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#000000"
                                    strokeWidth={2}
                                    strokeDasharray="5 5"
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 4 }}
                                    name="Promedio Total"
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

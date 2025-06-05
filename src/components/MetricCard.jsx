// src/components/MetricCard.jsx
const MetricCard = ({ color, count }) => {
  const colorStyles = {
    Amarillo: "bg-yellow-400",
    Azul: "bg-blue-500",
    Verde: "bg-green-500",
    Rojo: "bg-red-500",
  };

  return (
    <div className="relative bg-white p-4 pl-6 rounded-xl shadow-md flex items-center gap-4">
      <div className={`absolute left-0 top-0 h-full w-3 rounded-l-xl ${colorStyles[color]}`} />
      
      <div>
        <h4 className="text-gray-500 text-sm">Llamado {color}</h4>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default MetricCard;

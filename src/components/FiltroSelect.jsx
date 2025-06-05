// components/FiltroSelect.jsx
import React from 'react';

const FiltroSelect = ({ label, value, onChange, opciones, name }) => {
  return (
    <div className="my-6">
      <label className="block font-medium text-gray-1000 mb-1 text-md">{label}:</label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-indigo-100 mt-1 block w-full max-w-xs pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        <option value="Todos">Todas</option>
        {opciones.map((opcion, index) => (
          <option key={index} value={typeof opcion === 'object' ? opcion.value : opcion}>
            {typeof opcion === 'object' ? opcion.label : opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroSelect;

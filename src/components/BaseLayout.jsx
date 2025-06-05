// src/components/BaseLayout.jsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart2, Circle, HeartPulse, ShieldAlert, Activity, Menu
} from "lucide-react";
import logo from "../assets/logo2.png";

const navItems = [
  { name: "Inicio", path: "/", icon: <BarChart2 size={20} /> },
  { name: "Habitaciones", path: "/analytics", icon: <Activity size={20} /> },
 
];

const BaseLayout = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 relative overflow-hidden">
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 left-4 z-50 p-2 bg-slate-800 text-white rounded-md shadow-lg hover:bg-purple-600 transition"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 h-full bg-slate-900 text-white p-6 space-y-6 shadow-xl transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0 w-60" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center space-x-3">
          <img
            src= {logo}
            alt="Logo"
            className="w-10 h-10 ml-10"
          />
          <h1 className="text-xl font-bold tracking-wide">TechMedic</h1>
        </div>

        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-purple-600 ${
                location.pathname === item.path ? "bg-purple-700" : "bg-slate-800"
              }`}
              // onClick={() => setSidebarOpen(false)} // cerrar sidebar al navegar
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto text-sm text-gray-400 text-center">
          © {new Date().getFullYear()} TechMedic Inc.
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 p-8 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "ml-55" : "ml-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;

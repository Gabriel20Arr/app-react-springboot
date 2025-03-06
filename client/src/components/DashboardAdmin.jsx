import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

import ProductosPagesDash from "./ProductosPagesDash";


const DashboardAdmin = () => {
  const salesData = [
    { month: "Ene", sales: 400 },
    { month: "Feb", sales: 800 },
    { month: "Mar", sales: 1200 },
    { month: "Abr", sales: 1500 },
    { month: "May", sales: 1800 },
  ];

  const ordersData = [
    { day: "Lun", orders: 30 },
    { day: "Mar", orders: 50 },
    { day: "Mié", orders: 70 },
    { day: "Jue", orders: 60 },
    { day: "Vie", orders: 90 },
  ];

  return (
    <div className="mt-12 p-6 bg-gray-100 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

      {/* Tarjetas de Resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-gray-500 text-sm uppercase">Total Ventas</h2>
          <p className="text-2xl font-bold text-gray-800">$25,000</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-gray-500 text-sm uppercase">Órdenes</h2>
          <p className="text-2xl font-bold text-gray-800">1,250</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md text-center">
          <h2 className="text-gray-500 text-sm uppercase">Total Usuarios</h2>
          <p className="text-2xl font-bold text-gray-800">320</p>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ventas Mensuales */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ventas Mensuales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Órdenes Semanales */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Órdenes Semanales</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersData}>
              <XAxis dataKey="day" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="orders" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <ProductosPagesDash />
    </div>
  );
};

export default DashboardAdmin;

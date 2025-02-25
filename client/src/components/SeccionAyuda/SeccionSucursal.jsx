import React from 'react';

const SeccionSucursal = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Nuestra Sucursal</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ubicación */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
          <p>📍 Argentina, Córdoba</p>
          <p>Calle 3, 891</p>
        </div>

        {/* Horarios de Atención */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Horarios de Atención</h2>
          <ul className="list-disc pl-6">
            <li>Lunes a Viernes: 9:00 AM - 6:00 PM</li>
            <li>Sábado: 10:00 AM - 2:00 PM</li>
            <li>Domingo: Cerrado</li>
          </ul>
        </div>

        {/* Mapa - Ocupa toda la fila */}
        <div className="bg-white p-6 shadow-md rounded-lg col-span-1 md:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Cómo Llegar</h2>
          <iframe
            className="w-full h-80 rounded-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.546563254604!2d-99.17097602570941!3d19.39100384202619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff9e8e4a90c7%3A0x47a4bda595ae622e!2sEjemplo%20Sucursal!5e0!3m2!1ses-419!2s!4v1707849363120"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default SeccionSucursal;

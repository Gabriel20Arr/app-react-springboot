import React, { useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";
import { FiMail, FiPhone, FiUser, FiMapPin, FiShield } from 'react-icons/fi';

const ProfilePages = () => {
  const { profile, user } = useAuthContext();

  useEffect(() => {
    async function getProfile() {
      await profile();
    }
    
    getProfile();
  }, []);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-gray-100 py-12 px-4 mt-12">
      {user ? (
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Mi Perfil</h1>
          <div className="flex flex-col md:flex-row gap-8">
            {/* Tarjeta de perfil */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-8 w-full md:w-1/3 transform transition-all duration-300 hover:shadow-xl">
              <div className="relative">
                <img
                  className="rounded-full h-40 w-40 object-cover border-4 border-primary shadow-md"
                  alt={user.nombre}
                  src={`https://ui-avatars.com/api/?name=${user.nombre}&background=6366f1&color=fff`}
                />
                <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg">
                  <FiUser className="h-5 w-5" />
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-bold text-gray-800">{user.nombre}</h2>
              <span className="mt-2 px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                {user.roles && user.roles.length > 0 ? user.roles[0].rolNombre : 'Sin rol asignado'}
              </span>
              <p className="mt-4 text-gray-600 flex items-center gap-2">
                <FiMapPin className="text-primary" />
                {user.pais}, {user.provincia}
              </p>
            </div>

            {/* Información del usuario */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <FiShield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Información de la cuenta</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <FiUser className="text-primary" />
                        <p className="text-sm font-medium text-gray-500">Usuario</p>
                      </div>
                      <p className="text-gray-800 font-semibold pl-8">{user.nombreUsuario}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <FiMail className="text-primary" />
                        <p className="text-sm font-medium text-gray-500">Email</p>
                      </div>
                      <p className="text-gray-800 font-semibold pl-8">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <FiPhone className="text-primary" />
                        <p className="text-sm font-medium text-gray-500">Teléfono</p>
                      </div>
                      <p className="text-gray-800 font-semibold pl-8">{user.telefono}</p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:bg-gray-100">
                      <div className="flex items-center gap-3 mb-2">
                        <FiMapPin className="text-primary" />
                        <p className="text-sm font-medium text-gray-500">Dirección</p>
                      </div>
                      <p className="text-gray-800 font-semibold pl-8">{user.direccion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No hay usuario disponible.</p>
        </div>
      )}
    </div>
  );
};

export default ProfilePages;

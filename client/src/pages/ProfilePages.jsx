import React, { useEffect } from 'react';
import { useAuthContext } from "../context/AuthContext";

const ProfilePages = () => {
  const { profile, user } = useAuthContext();

  useEffect(() => {
    async function getProfile() {
      await profile();
    }
    
    getProfile();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center bg-background">
      {user ? (
        <div className="flex flex-col md:flex-row items-center w-[90%] max-w-4xl rounded-lg p-6 space-y-6 md:space-y-0 md:space-x-6 my-12">
          
          {/* Tarjeta de perfil */}
          <div className="flex flex-col items-center bg-white border border-gray-200 shadow-md rounded-lg p-6 w-full md:w-1/3">
            <img
              className="border-4 border-gray-300 rounded-full h-32 w-32"
              alt={user.nombre}
              src={`https://ui-avatars.com/api/?name=${user.nombre}`}
            />
            <h2 className="mt-4 text-2xl font-semibold text-gray-700">{user.nombre}</h2>
            <p className="text-gray-500">{user.roles && user.roles.length > 0 ? user.roles[0].rolNombre : 'Sin rol asignado'}</p>
            <p className="text-gray-500">Argentina, Córdoba</p>
          </div>

          {/* Información del usuario */}
          <div className="flex flex-col w-full md:w-2/3 bg-white border border-gray-200 shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Información de la cuenta</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
              <div>
                <p className="text-sm text-gray-400">Usuario</p>
                <p className="font-medium">{user.nombreUsuario}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Teléfono</p>
                <p className="font-medium">+54 3534239563</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Rol</p>
                <p className="font-medium">{user.roles && user.roles.length > 0 ? user.roles[0].rolNombre : 'Sin rol asignado'}</p>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <p className="text-sm text-gray-400">Dirección</p>
                <p className="font-medium">Argentina, Córdoba</p>
              </div>
            </div>
          </div>

        </div>
      ) : (
        <p className="text-xl text-gray-500">No hay usuario disponible.</p>
      )}
    </div>
  );
};

export default ProfilePages;

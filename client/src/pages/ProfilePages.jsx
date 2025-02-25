import React, { useEffect } from 'react'
import { useAuthContext } from "../context/AuthContext"

const ProfilePages = () => {
  const { profile, user } = useAuthContext()

  useEffect(()=> {
    async function getProfile(){
      await profile()
    }
    getProfile()
  }, [])
  
  return (
    <div className="w-full h-screen flex items-center justify-center text-black text-4xl m-0 p-0 bg-gray-100">
      {user ? ( 
          <div className="flex  items-center justify-center h-[50%] w-[90%]">
            <div className='flex flex-col items-center justify-start border-2 bg-white shadow-md rounded-sm mr-5 h-full w-80 p-3'>
              <div className='flex flex-col items-center justify-center'>
                <img 
                className='flex items-center justify-center border-2 rounded-full h-32 w-32'
                alt="Gabriel" 
                src={`https://ui-avatars.com/api/?name=${user.nombre}`}
                />
                <div className="flex items-center justify-center w-full text-xl mt-3">{user.nombre}</div>
              </div>
               
              <div className='flex flex-col items-center justify-center mt-10'>
                <div className="flex items-center justify-center w-full text-xl text-gray-400">{user.roles && user.roles.length > 0 ? user.roles[0].rolNombre : 'Sin rol asignado'}</div>
                <div className="flex items-center justify-center w-full text-xl text-gray-400">Argentina, Cordoba</div>
              </div>
             </div>

            <div className="flex items-center justify-between border-2 bg-white rounded-sm w-full h-full p-5">
              <div className="flex flex-col justify-evenly w-[35%] h-full pb-3">
                <label className="flex items-center text-xl border-b-2">Usuario</label>
                <label className="flex items-center text-xl border-b-2">Email</label>
                <label className="flex items-center text-xl border-b-2">Phone</label>
                <label className="flex items-center text-xl border-b-2">Rol</label>
                <label className="flex items-center text-xl border-b-2">Addres</label>
              </div>

              <div className="flex flex-col justify-evenly w-[65%] h-full pb-3">
                <div className="flex items-center justify-start w-full text-xl text-gray-400 border-b-2">{user.nombreUsuario}</div>
                <div className="flex items-center justify-start w-full text-xl text-gray-400 border-b-2">{user.email}</div>
                <div className="flex items-center justify-start w-full text-xl text-gray-400 border-b-2">3534239563</div>
                <div className="flex items-center justify-start w-full text-xl text-gray-400 border-b-2">{user.roles && user.roles.length > 0 ? user.roles[0].rolNombre : 'Sin rol asignado'}</div>
                <div className="flex items-center justify-start w-full text-xl text-gray-400 border-b-2">Argentina, Cordoba</div>
              </div>  
              
            </div>
            
          </div>
      )
      : (
        <p>No hay usuario disponible.</p>
      )}
    </div>
)}

export default ProfilePages
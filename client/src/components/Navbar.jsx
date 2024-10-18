import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"


const Navbar = () => {
  const { profile, user } = useAuthContext()

  useEffect(()=> {
    async function getProfile(){
      await profile()
    }
    getProfile()
  }, [])
  
  return (
    <div className='w-full flex justify-between bg-blue-400 font-bold p-3'>
        <div className='flex items-center space-x-4'>
            <Link to="/" className='flex items-center justify-center border-1 text-2xl hover:text-gray-200 focus:outline-none focus:border-b-2'>Home</Link>
            <Link to="/contact" className='flex items-center justify-center border-1 text-2xl  hover:text-gray-200 focus:outline-none focus:border-b-2'>contactos</Link>
        </div>
        <Link to="/profile" className='flex items-center justify-center border-1 rounded-full text-black transition-colors focus:ring-offset-1'>
          <img 
            className='flex items-center justify-center border-2 rounded-full h-12 w-12 hover:border-blue-500'
            src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
            alt="nombre"
          />
        </Link>
    </div>
  )
}

export default Navbar
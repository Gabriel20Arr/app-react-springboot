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
            <Link to="/" className='flex items-center justify-center border-1 text-2xl hover:scale-110 hover:text-black' >Home</Link>
            <Link to="/" className='flex items-center justify-center border-1 text-2xl hover:scale-110 hover:text-black' >contactos</Link>
        </div>
        <Link to="/profile" className='flex items-center justify-center border-1 rounded-full text-black transition-colors focus:ring-offset-1'>
          <img 
            className='flex items-center justify-center border-2 rounded-full h-12 w-12 hover:border-black'
            src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
            alt="nombre"
          />
        </Link>
    </div>
  )
}

export default Navbar
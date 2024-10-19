import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"
import Cookies from 'js-cookie';


const Navbar = () => {
  const { profile, user, setIsAuthtenticated } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false) // Controla la visibilidad del menú

  useEffect(() => {
    async function getProfile() {
      await profile()
    }
    getProfile()
  }, [])

  // Función para abrir o cerrar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const handleLogout = async () => {
    await Cookies.remove("token")
    await setIsAuthtenticated(false)
    window.location.reload();
  }
  
  return (
    <div className='w-full flex justify-between bg-blue-400 font-bold p-3 relative'>
      <div className='flex items-center space-x-4'>
        <Link to="/" className='flex items-center justify-center border-1 text-2xl hover:text-gray-200 focus:outline-none focus:border-b-2'>Home</Link>
        <Link to="/contact" className='flex items-center justify-center border-1 text-2xl hover:text-gray-200 focus:outline-none focus:border-b-2'>contactos</Link>
      </div>

      <div className='relative'>
        {/* Imagen del perfil que al hacer clic abre el menú */}
        <button onClick={toggleMenu} className='flex items-center justify-center border-1 rounded-full text-black transition-colors focus:ring-offset-1'>
          <img
            className='flex items-center justify-center border-2 rounded-full h-12 w-12 hover:border-blue-500'
            src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
            alt="nombre"
          />
        </button>

        {/* Menú desplegable */}
        {menuOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50'>
            <ul className='py-1'>
              <li>
                <Link to="/profile" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  Perfil
                </Link>
              </li>
              <li>
                <button onClick={() => handleLogout()} className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                  Cerrar sesión
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
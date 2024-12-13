import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"
import Cookies from 'js-cookie';

import lupa from "../assets/img/header/lupa-de-busqueda.png"
import cart from "../assets/img/carrito-de-compras.png"

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
    <div className='w-full h-[120px] flex flex-col font-bold z-50 fixed'>
  
      {/* Primer navbar */}
      <div className='w-full flex flex-row justify-between items-center bg-blue-400 font-bold p-2'>
        {/* Imagen del perfil que al hacer clic abre el menú */}
        <div className='relative'>
          <button onClick={toggleMenu} className='flex items-center justify-center border-1 rounded-full text-black transition-colors focus:ring-offset-1'>
            <img
              className='flex items-center justify-center border-2 rounded-full h-12 w-12 hover:border-blue-500'
              src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
              alt="nombre"
            />
          </button>
  
          {/* Menú desplegable */}
          {menuOpen && (
            <div className='absolute left-0 mt-3 w-48 bg-white rounded-md shadow-lg z-50'>
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
  
        <div className='w-28 flex flex-col text-black text-2xl font-serif'>
          <span className='w-full text-center'>Tu</span>
          <span className='w-full text-end'>Mate</span>
        </div>
  
        {/* Imagen de carrito de compras */}
        <div className='flex m-0 items-center'>
          <img src={cart} alt="cart" className='w-9 h-9'/>
        </div>
      </div>
  
      {/* Segundo navbar para links principales */}
      <div className='w-full h-10 flex justify-between bg-blue-400 font-bold border-t border-gray-300 p-1 sticky top-0'>
        <div className='flex items-center space-x-4'>
          <Link 
            to="/" 
            className='flex items-center justify-center border-1 text-lg font-mono text-black hover:text-gray-200 focus:outline-none focus:border-b-2'
          >
            Inicio
          </Link>
          <Link 
            to="/" 
            className='flex items-center justify-center border-1 text-lg font-mono text-black hover:text-gray-200 focus:outline-none focus:border-b-2' 
          >
            Productos
          </Link>
          <Link 
            to="/" 
            className='flex items-center justify-center border-1 text-lg font-mono text-black hover:text-gray-200 focus:outline-none focus:border-b-2'
          >
            Sobre Nosotros
          </Link>
          <Link 
            to="/contact" 
            className='flex items-center justify-center border-1 text-lg font-mono text-black hover:text-gray-200 focus:outline-none focus:border-b-2'
          >
            Contactos
          </Link>
        </div>

        {/* Buscador */}
        <div class="max-w-full flex border border-gray-500 bg-white rounded-md p-1">
            <img src={lupa} alt="search" className='w-5 h-5 items-center'/>
            <input type="search" placeholder='Buscar produtos..' class="font-serif text-sm text-black p-1 focus:outline-none focus:ring-0"/>
        </div>
      </div>
  
    </div>
  );
  
}

export default Navbar
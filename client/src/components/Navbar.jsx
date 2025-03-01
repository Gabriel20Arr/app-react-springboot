import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"
import Cookies from 'js-cookie';
import { FiMenu, FiX } from "react-icons/fi";

import lupa from "../assets/img/header/lupa-de-busqueda.png"
import cart from "../assets/img/carrito-de-compras.png"

const Navbar = () => {
  const { profile, user, setIsAuthtenticated } = useAuthContext()
  const [menuOpen, setMenuOpen] = useState(false); // Menú móvil
  const [profileOpen, setProfileOpen] = useState(false); // Menú perfil
  
  useEffect(() => {
    async function getProfile() {
      await profile();
    }
    getProfile();
  }, [])

  const handleLogout = async () => {
    await Cookies.remove("token")
    await setIsAuthtenticated(false)
    window.location.reload();
  }

  return (
    <nav className="w-full font-heading">
      <div className="w-full">
        {/* Primer navbar */}
        <div className="w-full h-12 flex justify-between bg-green-600 font-bold py-2 px-5 border-b border-gray-300 fixed z-20">
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
            <Link to="/productos" className="text-white hover:text-gray-300">Productos</Link>
            <Link to="/aboutMe" className="text-white hover:text-gray-300">Sobre Nosotros</Link>
            <Link to="/contact" className="text-white hover:text-gray-300">Contacto</Link>
            <Link to="/dash-admin" className="text-white hover:text-gray-300">Dashboard</Link>
          </div>

          {/* Buscador */}
          <div className="hidden md:flex items-center border border-gray-500 bg-white rounded-md px-4">
            <img src={lupa} alt="search" className="w-5 h-5"/>
            <input type="search" placeholder="Buscar productos.." className="text-sm text-black p-1 focus:outline-none"/>
          </div>
        </div>

        {/* Segundo navbar */}
        <div className="w-full flex justify-between items-center bg-green-600 font-bold py-3 px-5 relative top-12 z-10">
          {/* Imagen de perfil */}
          <div className="relative">
            <button 
              onClick={() => setProfileOpen(!profileOpen)} 
              className="flex items-center justify-center border-1 rounded-full"
            >
              <img
                className="border-2 rounded-full h-12 w-12 hover:border-blue-500"
                src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
                alt="nombre"
              />
            </button>

            {/* Menú desplegable del perfil */}
            {profileOpen && (
              <div className="absolute top-0 left-0 mt-3 bg-white rounded-md shadow-lg z-0">
                <ul className="py-1">
                  <li>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Perfil
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Logo */}
          <h1 className="w-28 flex flex-col text-white text-2xl font-serif">
            <span className="w-full text-center">Tu</span>
            <span className="w-full text-end">Mate</span>
          </h1>

          {/* Carrito de compras */}
          <div className="flex items-center">
            <img src={cart} alt="cart" className="w-9 h-9"/>
          </div>
        </div>
      </div>  


      {/* Ícono de menú (Solo en móviles) */}
      <div className="md:hidden w-full h-12 flex justify-between bg-blue-500 font-bold py-2 px-5 border-b border-gray-300 fixed top-0 z-30">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-black">
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>

        {/* Buscador */}
        <div className="flex items-center border border-gray-500 bg-white rounded-md px-4 ">
          <img src={lupa} alt="search" className="w-5 h-5"/>
          <input type="search" placeholder="Buscar productos.." className="text-sm text-black p-1 focus:outline-none"/>
        </div>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className={`md:hidden bg-blue-300 w-full fixed top-12 left-0 flex flex-col items-center py-4 space-y-4 transition-all duration-300 pt-5 z-[1] ${menuOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
          <Link to="/" className="text-black hover:text-gray-300" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/productos" className="text-black hover:text-gray-300" onClick={() => setMenuOpen(false)}>Productos</Link>
          <Link to="/about" className="text-black hover:text-gray-300" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
          <Link to="/contact" className="text-black hover:text-gray-300" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </div>
      )}

    </nav>
  );
}

export default Navbar;

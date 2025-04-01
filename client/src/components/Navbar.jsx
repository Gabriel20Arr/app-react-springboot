import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext"
import { useSearchContext } from '../context/SearchContext';
import { useCartContext } from '../context/CartContext';
import Cookies from 'js-cookie';
import { FiMenu, FiX, FiSearch, FiShoppingCart } from "react-icons/fi";
import Cart from "./Cart";
import LogoWeb from "/logo-web-.png"

const Navbar = () => {
  const { profile, user, isAuthtenticated, setIsAuthtenticated } = useAuthContext()
  const { searchTerm, setSearchTerm } = useSearchContext();
  const { getTotalItems } = useCartContext();
  const [menuOpen, setMenuOpen] = useState(false); // Menú móvil
  const [profileOpen, setProfileOpen] = useState(false); // Menú perfil
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showSecondNav, setShowSecondNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    async function getProfile() {
      await profile();
    }
    getProfile();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowSecondNav(false);
      } else {
        // Scrolling up
        setShowSecondNav(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = async () => {
    await Cookies.remove("token")
    await setIsAuthtenticated(false)
    window.location.reload();
  }

  return (
    <>
      <nav className="w-full font-heading mb-[85px]">
        <div className="w-full">
          {/* Primer navbar */}
          <div className="w-full h-12 flex justify-between bg-green-600 font-bold py-2 px-5 border-b border-gray-300 fixed z-[998]">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-white hover:text-gray-300">Inicio</Link>
              <Link to="/productos" className="text-white hover:text-gray-300">Productos</Link>
              <Link to="/aboutMe" className="text-white hover:text-gray-300">Sobre Nosotros</Link>
              <Link to="/contact" className="text-white hover:text-gray-300">Contacto</Link>
              {isAuthtenticated && user?.roles?.[0]?.id === 1 && (
                <Link to="/dash-admin" className="text-white hover:text-gray-300">Dashboard</Link>
              )}
            </div>

            {/* Buscador */}
            <div className="hidden md:flex items-center border border-gray-500 bg-white rounded-md px-4 py-3">
              <FiSearch className="w-4 h-4 text-gray-500"/>
              <input 
                type="search" 
                placeholder="Buscar productos.." 
                className="text-sm text-black p-1 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Segundo navbar */}
          <div className={`w-full flex justify-between items-center bg-green-600 font-bold py-1 px-5 fixed top-12 z-[997] transition-transform duration-300 ${showSecondNav ? 'translate-y-0' : '-translate-y-full'}`}>
            {/* Imagen de perfil */}
            <div className="relative">
              <button 
                onClick={() => setProfileOpen(!profileOpen)} 
                className="flex items-center justify-center border-1 rounded-full bg-white"
              >
                <img
                  className="border-2 rounded-full h-12 w-12 hover:border-green-500"
                  src={`https://ui-avatars.com/api/?name=${user?.nombre || "nombre"}`}
                  alt="nombre"
                />
              </button>

              {/* Menú desplegable del perfil */}
              {profileOpen && (
                <div className="absolute top-0 left-0 mt-[55px] bg-white rounded-md shadow-lg z-[999] w-[130px] border">
                  <ul className="">
                    <li className='w-full px-2 pb-1 text-right border-b border-gray-400'>
                      <button 
                        className="bg-red-500 w-5 h-5 text-xs rounded-full"
                        onClick={() => setProfileOpen(false)}
                      >X</button>
                    </li>
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                        Perfil
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Logo */}
            <div className='flex items-center justify-center h-20 w-20  rounded-full'>
              <img src={LogoWeb} alt="Logo" className="h-full m-0 p-0"/>
            </div>

            {/* Carrito de compras */}
            <div className="flex items-center relative">
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="px-4 py-1 rounded-sm flex items-center gap-2"
              >
                <FiShoppingCart className="h-8 w-8 text-white" />
              </button>
              <span className="text-sm font-bold text-gray-700 bg-white border border-gray-100 rounded-full w-5 h-5 flex items-center justify-center absolute top-0 right-0">
                {getTotalItems()}
              </span>
            </div>
          </div>
        </div>  


        {/* Ícono de menú (Solo en móviles) */}
        <div className="md:hidden w-full h-12 flex justify-between bg-green-600 text-white font-bold py-2 px-5 border-b border-gray-300 fixed top-0 z-[999]">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black hover:text-gray-300">
            {menuOpen ? <FiX size={28} className="text-white" /> : <FiMenu size={28} className="text-white"/>} 
          </button>

          {/* Buscador móvil */}
          <div className="flex items-center border border-gray-500 bg-white rounded-md px-4">
            <FiSearch className="w-4 h-4 text-gray-500"/>
            <input 
              type="search" 
              placeholder="Buscar productos.." 
              className="text-sm font-heading text-gray-700 p-1 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <div className={`md:hidden bg-green-500 w-full fixed top-12 left-0 flex flex-col items-center py-4 transition-all duration-300 z-[999] ${menuOpen ? 'opacity-100' : 'opacity-0 invisible'}`}>
            <Link to="/" className="font-semibold text-gray-700 hover:bg-white w-full h-8 flex items-center justify-center" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/productos" className="font-semibold text-gray-700 hover:bg-white w-full h-8 flex items-center justify-center" onClick={() => setMenuOpen(false)}>Productos</Link>
            <Link to="/aboutMe" className="font-semibold text-gray-700 hover:bg-white w-full h-8 flex items-center justify-center" onClick={() => setMenuOpen(false)}>Sobre Nosotros</Link>
            <Link to="/contact" className="font-semibold text-gray-700 hover:bg-white w-full h-8 flex items-center justify-center" onClick={() => setMenuOpen(false)}>Contacto</Link>
            {isAuthtenticated && user?.roles?.[0]?.id === 1 && (
              <Link to="/dash-admin" className="font-semibold text-gray-700 hover:bg-white w-full h-8 flex items-center justify-center" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            )}
          </div>
        )}
      </nav>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Navbar;

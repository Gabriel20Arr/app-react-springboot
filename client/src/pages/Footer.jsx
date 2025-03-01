import React from 'react';
import visa from '../assets/img/Footer/Logovisa.png';
import mastercard from '../assets/img/Footer/Logomastercard.png';
import amex from '../assets/img/Footer/amex@2x.png';
import pagofacil from '../assets/img/Footer/pagofacil@2x.png';
import rapipago from '../assets/img/Footer/rapipago@2x.png';
import naranja from '../assets/img/Footer/tarjeta-naranja@2x.png';
import oca from '../assets/img/Footer/logo-oca-ok.png';

import { FaInstagram} from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-green-600 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sección de Información */}
        <div>
          <h2 className="text-lg font-bold mb-3">Sobre Nosotros</h2>
          <p className="text-sm">
            Tu Mate es la comunidad ideal para los amantes del mate. Compartimos información, experiencias y los mejores productos.
          </p>
        </div>

        {/* Sección de Métodos de Pago */}
        <div>
          <h2 className="text-lg font-bold mb-3">Métodos de Pago</h2>
          <div className="flex space-x-3">
            <img src={visa} alt="Visa" className="h-5"/>
            <img src={mastercard} alt="MasterCard" className="h-5"/>
            <img src={naranja} alt="naranja" className="h-5"/>
            <img src={amex} alt="amex" className="h-5"/>
            <img src={pagofacil} alt="pagofacil" className="h-5"/>
            <img src={rapipago} alt="rapipago" className="h-5"/>
            <img src={oca} alt="OCA" className="h-5"/>
          </div>
        </div>

        {/* Sección de Redes Sociales */}
        <div>
          <h2 className="text-lg font-bold ">Síguenos</h2>
          <div className="flex space-x-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram  className="h-10"/>   
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <CiFacebook className="h-10"/>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaXTwitter className="h-10"/>
            </a>
          </div>
        </div>
      </div>

      {/* Línea Divisoria */}
      <hr className="my-4 border-gray-400"/>

      {/* Derechos Reservados y Autor */}
      <div className="text-center text-sm">
        <p>© 2024 Tu Mate. Todos los derechos reservados.</p>
        <p>
          Creado por{' '}
          <a 
            rel="noopener noreferrer" 
            href="https://gabriel-arroyo.vercel.app/" 
            target="_blank" 
            className="text-white font-bold underline"
          >
            G.A
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;

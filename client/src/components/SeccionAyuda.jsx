import React from 'react'
import { Link } from 'react-router-dom'
import cart from "../assets/img/header/entrega-rapida.png"
import tarjeta from "../assets/img/header/tarjeta-bancaria.png"
import ubicacion from "../assets/img/header/ubicacion.png"
import exp from "../assets/img/header/revisar.png"

export const SeccionAyuda = () => {
  return (
    <div className='flex justify-start w-full pl-8 pt-5'>
      <div className='flex flex-col items-center justify-evenly w-[220px] h-[120px] p-3 text-sm border border-gray-400'>
        <div className='flex items-center justify-evenly w-[200px] h-[100px] p-2 text-sm'>
          <img src={cart} className='h-8 w-8 mr-2'/>
          <p>Hacemos envíos a cualquier parte de Argentina</p>
        </div>
        <Link className='text-blue-500'>Envio</Link>
      </div>
      
      <div className='flex flex-col items-center justify-evenly w-[220px] h-[120px] p-3 text-sm border border-gray-400'>
        <div className='flex items-center justify-evenly w-[200px] h-[100px] p-2 text-sm'>
          <img src={tarjeta} className='h-8 w-8 mr-2'/>
          <p>Pasos a seguir para realizar una compra desde la web</p>
        </div>
        <Link className='text-blue-500'>Pasarela Pago</Link>
      </div>
      
      <div className='flex flex-col items-center justify-evenly w-[220px] h-[120px] p-3 text-sm border border-gray-400'>
        <div className='flex items-center justify-evenly w-[200px] h-[100px] p-2 text-sm'>
          <img src={ubicacion} className='h-8 w-8'/>
          <p>
            Argentina, Cordoba
            <br/>
            <span>Calle 3, 891</span>
          </p>
        </div>
        <Link className='text-blue-500'>Sucursal</Link>
      </div>

      <div className='flex flex-col items-center justify-evenly w-[220px] h-[120px] p-3 text-sm border border-gray-400'>
        <div className='flex items-center justify-evenly w-[200px] h-[100px] p-2 text-sm'>
          <img src={exp} className='h-8 w-8'/>
          <p>
            +13 años en
            <br/>
            <span>Ventas Onlines</span>
          </p>
        </div>
      </div>
    </div>
  )
}

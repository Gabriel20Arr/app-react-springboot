import React from 'react'
import ProductosPages from "../pages/ProductosPages"
import Carrusel from '../components/Carrusel'
import { SeccionAyuda } from '../components/seccionAyuda'

const HomePage = () => {
  return (
    <div className="w-full flex flex-col items-center text-black font-bold text-4xl bg-gray-100">
      <Carrusel/>
      <SeccionAyuda />
      <ProductosPages />
    </div>
  )
}

export default HomePage
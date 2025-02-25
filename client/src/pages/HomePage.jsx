import React from 'react'
import Carrusel from '../components/Carrusel'
import { SeccionAyuda } from '../components/SeccionAyuda/SeccionAyuda'
import ProductosDestacados from '../components/ProductosDestacados'
import ProductosPages from "../pages/ProductosPages"
import ProductoDetalle from '../components/ProductoDetalle'

const HomePage = () => {
  return (
    <div className="min-w-full flex flex-col items-center text-black font-bold text-4xl bg-background z-0">
      <Carrusel/>
      <SeccionAyuda />
      <ProductosDestacados />
      <ProductosPages />
      <ProductoDetalle />
    </div>
  )
}

export default HomePage
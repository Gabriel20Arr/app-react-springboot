import React from 'react';
import { useForm } from "react-hook-form";
import { useProductContext } from '../context/ProductContext';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

import imgTest from "../assets/img/imgP-Dest/test-1-yerba.webp"

export const FormCreatePage = ({ closeModal }) => {
  const { createProduct, getProducts, errorPost } = useProductContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    await createProduct(data); // Creamos el nuevo producto
    await getProducts(); // Refrescamos la lista de productos después de la creación
    reset(); // Limpiamos el formulario
    closeModal();
    Swal.fire({
      text: 'Producto creado correctamente.',
      icon: 'success',
      toast: true, // Esto hace que sea una alerta pequeña como un toast
      position: 'bottom-end', // Posicionada en la parte inferior derecha
      showConfirmButton: false, // Sin botón de confirmación
      timer: 3000, // Desaparece automáticamente después de 3 segundos
      timerProgressBar: true, // Mostrar barra de progreso
      width: '300px', // Ajustar el tamaño de la alerta
    });
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"> 
    <div className="w-[750px] bg-white p-6 rounded-2xl shadow-lg">
      <form onSubmit={onSubmit} className="flex flex-col gap-3">

        {/* Header con título y botón de cerrar */}
        <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded-lg">
          <h1 className="font-bold text-xl">Crear Producto</h1>
          <button 
            type="button" 
            onClick={closeModal} 
            className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full text-white hover:bg-red-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Imagen + Nombre + Precio */}
        <div className="flex items-center">
          <img 
            src={imgTest}
            alt="Producto" 
            className="w-auto h-[140px] object-cover rounded-lg border border-gray-300 mr-4"
          />
          <div className="flex flex-col flex-grow max-h-[150px]">
            <input 
              type="text" 
              placeholder="Nombre" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" 
              {...register("nombre")} 
            />
            {errors.nombre && <span className="text-red-600 text-sm">El nombre es requerido o está duplicado</span>}

            <label className="text-lg font-semibold mt-2">Precio</label>
            <input 
              type="number" 
              placeholder="Precio" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
              {...register("precio", {min: 0})} 
              min="0"
            />
            {errors.precio && <span className="text-red-600 text-sm">El precio es requerido</span>}
          </div>
        </div>

        {/* Altura + Ancho */}
        <div className="flex gap-3 w-full">
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold">Altura</label>
            <input 
              type="number" 
              placeholder="Altura" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
              {...register("altura", {min: 0})} 
              min="0"
            />
            {errors.altura && <span className="text-red-600 text-sm">La altura es requerida</span>}
          </div>

          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold">Ancho</label>
            <input 
              type="number" 
              placeholder="Ancho" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
              {...register("ancho", {min: 0})} 
              min="0"
            />
          </div>
        </div>

        {/* Peso + Stock */}
        <div className="flex gap-3 w-full">
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold">Peso</label>
            <input 
              type="number" 
              placeholder="Peso" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
              {...register("peso", {min: 0})} 
              min="0"
            />
            {errors.peso && <span className="text-red-600 text-sm">El peso es requerido</span>}
          </div>
          
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold">Stock</label>
            <input 
              type="number" 
              placeholder="Stock" 
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
              {...register("stock", {min: 0})} 
              min="0"
            />
            {errors.stock && <span className="text-red-600 text-sm">El stock es requerido</span>}
          </div>
        </div>

        {/* Categoria */}
        <label className="text-lg font-semibold mt-2">Categoría</label>
        <input 
          type="text" 
          placeholder="Nombre Categoría" 
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"  
          {...register("categoria")} 
        />
        {errors.categoria && <span className="text-red-600 text-sm">La categoría es requerida</span>}

        {/* Descripcion */}
        <label className="text-lg font-semibold mt-2">Descripcion</label>
        <textarea 
          type="text" 
          placeholder="Descripcion" 
          className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
          {...register("descripcion")} 
        />
        {errors.categoria && <span className="text-red-600 text-sm">La categoría es requerida</span>}

        {/* Destacar */}
        <label className="text-lg font-semibold">¿Destacar?</label>
        <select 
          {...register("featured")} 
          className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        >
          <option value="false">No destacar</option>
          <option value="true">Destacar</option>
        </select>

        {/* Botón de enviar */}
        <button 
          type="submit"  
          className="w-full text-white bg-green-500 rounded-lg p-3 font-bold mt-2 hover:bg-green-600 transition"
        >
          Crear
        </button>
      </form>
    </div>
  </div>
  );
};

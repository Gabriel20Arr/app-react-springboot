import React from 'react';
import { useForm } from "react-hook-form";
import { useProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import imgTest from "../assets/img/imgP-Dest/test-1-yerba.webp"

export const FormCreatePage = ({ onClose }) => {
  const { createProduct, getProducts, errorPost } = useProductContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      await createProduct(data);
      await getProducts();
      reset();
      onClose();
      Swal.fire({
        text: 'Producto creado correctamente.',
        icon: 'success',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        width: '300px',
      });
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
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
              onClick={onClose}
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
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("nombre", { required: true })}
              />
              {errors.nombre && <span className="text-red-600 text-sm">El nombre es requerido</span>}

              <label className="text-lg font-semibold mt-2">Precio</label>
              <input
                type="number"
                placeholder="Precio"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("precio", { required: true, min: 0 })}
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
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("altura", { required: true, min: 0 })}
                min="0"
              />
              {errors.altura && <span className="text-red-600 text-sm">La altura es requerida</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold">Ancho</label>
              <input
                type="number"
                placeholder="Ancho"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("ancho", { required: true, min: 0 })}
                min="0"
              />
              {errors.ancho && <span className="text-red-600 text-sm">El ancho es requerido</span>}
            </div>
          </div>

          {/* Peso + Stock */}
          <div className="flex gap-3 w-full">
            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold">Peso</label>
              <input
                type="number"
                placeholder="Peso"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("peso", { required: true, min: 0 })}
                min="0"
              />
              {errors.peso && <span className="text-red-600 text-sm">El peso es requerido</span>}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-lg font-semibold">Stock</label>
              <input
                type="number"
                placeholder="Stock"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("stock", { required: true, min: 0 })}
                min="0"
              />
              {errors.stock && <span className="text-red-600 text-sm">El stock es requerido</span>}
            </div>
          </div>

          {/* Categoria */}
          <label className="text-lg font-semibold mt-2">Categoria</label>
          <select
            {...register("categoria", { required: true })}
            className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona una categoría</option>
            <option value="Mates">Mates</option>
            <option value="Termos">Termos</option>
            <option value="Yerbas">Yerbas</option>
            <option value="Bombillas">Bombillas</option>
            <option value="CanastaMatera">Canasta Matera</option>
          </select>
          {errors.categoria && <span className="text-red-600 text-sm">La categoría es requerida</span>}

          {/* Descripcion */}
          <label className="text-lg font-semibold mt-2">Descripcion</label>
          <textarea
            placeholder="Descripcion"
            className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
            {...register("descripcion", { required: true })}
          />
          {errors.descripcion && <span className="text-red-600 text-sm">La descripción es requerida</span>}

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

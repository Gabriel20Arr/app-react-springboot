import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export const FormCreatePage = ({ onClose }) => {
  const { createProduct, getProducts, errorPost } = useProductContext();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [categorias, setCategorias] = useState([
    "Mates", "Termos", "Yerbas", "Bombillas", "Canasta Matera"
  ]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const agregarCategoria = () => {
    if (nuevaCategoria.trim() && !categorias.includes(nuevaCategoria.trim())) {
      setCategorias([...categorias, nuevaCategoria.trim()]);
      setNuevaCategoria("");
      Swal.fire({
        text: `Categoría "${nuevaCategoria.trim()}" agregada correctamente.`,
        icon: 'success',
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: '300px',
      });
    }
  };
  const onSubmit = handleSubmit(async (data) => {
    try {
      const formData = new FormData();
      const productData = new Blob([JSON.stringify({
        ...data,
        featured: data.featured === 'true'
      })], {
        type: 'application/json'
      });
      
      formData.append('producto', productData);
      if (imagen) {
        formData.append('imagen', imagen);
      }

      await createProduct(formData);
      await getProducts();
      reset();
      setImagen(null);
      setPreviewUrl(null);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50 overflow-y-auto">
      <div className="w-[750px] bg-white p-6 rounded-2xl shadow-lg relative top-[210px]">
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
            <div className="relative w-[140px] h-[140px] mr-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="mt-1 text-sm text-gray-600">
                      Click para subir imagen
                    </p>
                  </div>
                )}
              </div>
            </div>
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

          {/* Categoría */}
          <label className="text-lg font-semibold mt-2">Categoría</label>
          <select
            {...register("categoria", { required: true })}
            className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria, index) => (
              <option key={index} value={categoria}>{categoria}</option>
            ))}
          </select>
          {errors.categoria && <span className="text-red-600 text-sm">La categoría es requerida</span>}

          {/* Agregar nueva categoría */}
          <div className="flex gap-2 mt-2 w-full">
            <input
              type="text"
              value={nuevaCategoria}
              onChange={(e) => setNuevaCategoria(e.target.value)}
              placeholder="Agregar nueva categoría"
              className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 w-full"
            />
            <button
              type="button"
              onClick={agregarCategoria}
              className="p-3 font-sans border border-gray-300 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Agregar
            </button>
          </div>

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

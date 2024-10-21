import React from 'react';
import { useForm } from "react-hook-form";
import { useProductContext } from '../context/ProductContext';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

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
    <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'>
      <div className="text-black flex flex-col items-center justify-center">
        <form onSubmit={onSubmit} className='flex flex-col items-center justify-center p-3 w-100 h-full rounded-lg border-black bg-gray-100'>
          <div className='w-full flex items-center justify-between p-4 mb-3 bg-blue-200'>
            <h1 className="font-bold w-96 text-xl">Crear Producto</h1>
            <button onClick={closeModal} className='flex items-center justify-center hover:scale-110 border-2 bg-gray-100 w-8 h-8 pb-2 rounded-full'>x</button>
          </div>
          <input type='text' placeholder='Nombre' className='p-2 mb-2 rounded-lg w-full text-lg' {...register("nombre", { required: true })} />
          {errors.nombre && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El nombre es requerido o esta duplicado"}</span>}
          
          <input type='number' placeholder='Precio' className='p-2 mb-2 rounded-lg w-full text-lg' {...register("precio", { required: true, min: 0 })} min="0" />
          {errors.precio && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El precio es requerido"}</span>}
          
          <input type='number' placeholder='Peso' className='p-2 mb-2 rounded-lg w-full text-lg' {...register("peso", { required: true, min: 0 })} min="0"/>
          {errors.peso && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El peso es requerido"}</span>}
          
          <input type='number' placeholder='Altura' className='p-2 mb-2 rounded-lg w-full text-lg' {...register("altura", { required: true, min: 0 })} min="0"/>
          {errors.altura && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El altura es requerido"}</span>}
          
          <textarea placeholder='Descripción' className='p-2 mb-2 rounded-lg min-h-20 w-full text-lg' {...register("descripcion", { required: true })} min="0" />
          {errors.descripcion && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El descripcion es requerido"}</span>}
          <button type='submit'  className='w-full text-white border-separate bg-blue-600 rounded-md p-2 pr-4 pl-4 font-bold mt-2'>Crear</button>
        </form>
      </div>
    </div>
  );
};

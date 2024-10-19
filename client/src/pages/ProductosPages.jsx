import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useForm } from "react-hook-form";
import edit from '../assets/img/editar.png';
import eliminar from '../assets/img/eliminar.png';
import add from '../assets/img/agregar.png';
import { FormCreatePage } from './FormCreatePage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const ProductosPages = () => {
  const { product, getProducts, deleteProduct, actualizarProduct, getProduct, errorPut, setErrorPut } = useProductContext();
  const [openCreate, setOpenCreate] = useState(false); // Modal para el form de creación
  const [openDetalle, setOpenDetalle] = useState(false); // Modal para ver detalles
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para producto seleccionado para editar
  const [openEdit, setOpenEdit] = useState(false); // Modal para el form de edición
  const [productDetalle, setProductDetalle] = useState(null); // Estado para detalles del producto
  const { register, handleSubmit, formState: {errors} } = useForm();
  
  useEffect(() => {
    async function getP() {
      await getProducts();
    }
    getP();
  }, []);

  // Abrir y cerrar el modal de creación
  const openCreateModal = () => {
    setOpenCreate(true);
  };

  const closeCreateModal = () => {
    setOpenCreate(false);
  };

  // Función para abrir el modal de actualización
  const handleEditProduct = (item) => {
    setSelectedProduct(item);
    setOpenEdit(true); // Abre el modal de edición
  };

  const handleDeleteProduct = async (id, nombre) => {
    if (id) {
      const result = await Swal.fire({
        title: 'Eliminar producto',
        text: `¿Estás seguro de eliminar el producto: ${nombre}?`,
        icon: 'warning',
        showCancelButton: true, // Mostrar botón de cancelar
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      // Si el usuario confirma, result.isConfirmed será true
      if (result.isConfirmed) {
        await deleteProduct(id); // Elimina el producto
        await getProducts(); // Vuelve a cargar los productos
        Swal.fire({
          text: 'Producto eliminado correctamente.',
          icon: 'success',
          toast: true, // Esto hace que sea una alerta pequeña como un toast
          position: 'bottom-end', // Posicionada en la parte inferior derecha
          showConfirmButton: false, // Sin botón de confirmación
          timer: 3000, // Desaparece automáticamente después de 3 segundos
          timerProgressBar: true, // Mostrar barra de progreso
          width: '300px', // Ajustar el tamaño de la alerta
        });
      }
    }
  };
  

  
  const onSubmit = handleSubmit(async (values) => {
    // Actualización de producto
    console.log(errors);
    
    try {
      if (selectedProduct) {
        await actualizarProduct({ ...values, id: selectedProduct.id });
        setSelectedProduct(null);  // Limpiar el producto seleccionado (cierra el modal)
        setOpenEdit(false); // Cerrar el modal de edición
        await getProducts();  // Refrescar la lista de productos
        Swal.fire({
          text: 'Producto actulizado correctamente.',
          icon: 'success',
          toast: true, // Esto hace que sea una alerta pequeña como un toast
          position: 'bottom-end', // Posicionada en la parte inferior derecha
          showConfirmButton: false, // Sin botón de confirmación
          timer: 3000, // Desaparece automáticamente después de 3 segundos
          timerProgressBar: true, // Mostrar barra de progreso
          width: '300px', // Ajustar el tamaño de la alerta
        });
      }
    } catch (error) {
      setErrorPut(error)
      console.log("Error al actualizar producto: ", error);
      // Aquí ya se maneja el error en actualizarProduct
    }
  });
  
  const handleDetalle = async (id) => {
    try {
      const res = await getProduct(id);  // Obtenemos los detalles completos del producto
      if (res) {
        setProductDetalle(res);
        setOpenDetalle(true);
      } else {
        console.error("El producto no se encontró.");
      }
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    }
  };

  return (
    <div className="w-full h-svh flex flex-col items-center text-black font-bold text-4xl p-8">
      <div className="w-full flex items-center justify-between text-black ">
        <h1 className="text-4xl font-bold mb-4 ">Lista de Productos</h1>
        <button onClick={openCreateModal} className='flex items-center justify-center hover:scale-110'>
          <img className='h-8 w-8' src={add} alt="add" />
        </button>
      </div>

      {/* MOSTRAMOS PRODUCTOS */}
      <div className="w-full grid grid-cols-3 gap-4">
        {product.length > 0 ? (
          product.map((item) => (
            <div key={item.id} className="flex flex-col items-center px-4 pb-4 border-2 bg-white shadow-md rounded-lg h-40 transition-all hover:scale-105 hover:shadow-lg">
              <div className='w-full flex items-center justify-end space-x-4 p-3'>
                <button onClick={() => handleEditProduct(item)} className='flex items-center justify-center  hover:scale-110'>
                  <img className='h-6 w-6' src={edit} alt="editar" />
                </button>
                <button onClick={() => handleDeleteProduct(item.id, item.nombre)} className='flex items-center justify-center hover:scale-110' disabled={false}>
                  <img className='h-6 w-6' src={eliminar} alt="eliminar" />
                </button>
              </div>
              <div className='flex flex-col items-start justify-center'>
                <h2 className="text-2xl font-semibold">{item.nombre}</h2>
                <p className="text-2xl font-semibold">Precio: ${item.precio}</p>
                <span className="text-xl text-blue-500 font-semibold border-blue-500 border-b-2 hover:scale-90">
                  <button onClick={() => handleDetalle(item.id)}>Ver más...</button>
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {/* FORMULARIO DE DETALLES DEL PRODUCTO */}
      {openDetalle && productDetalle && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'>
          <div className="text-black flex flex-col items-center justify-center">
            <div className='flex flex-col items-center justify-center p-3 w-100 h-full rounded-lg border-black bg-gray-100'>
              <div className='w-full flex items-center justify-between p-4 mb-3 bg-blue-200'>
                <h1 className="font-bold">Detalles del Producto</h1>
                <button onClick={() => setOpenDetalle(false)} className='flex items-center justify-center hover:scale-110 border-2 bg-gray-100 w-8 h-8 pb-2 rounded-full'>x</button>
              </div>
              {/* Detalles del producto */}
              <label className='w-full text-2xl'>Nombre</label>
              <input type='text' name="nombre" placeholder='Nombre' className='p-2 mb-2 rounded-lg text-2xl w-full pl-2' defaultValue={productDetalle.nombre} readOnly />
              
              <label className='w-full text-2xl'>Precio</label>
              <input type='number' name="precio" placeholder='Precio' className='p-2 mb-2 rounded-lg text-2xl w-full pl-2' defaultValue={productDetalle.precio} readOnly />
              
              <label className='w-full text-2xl'>Peso</label>
              <input type='number' name="peso" placeholder='Peso' className='p-2 mb-2 rounded-lg text-2xl w-full pl-2' defaultValue={productDetalle.peso} readOnly />
              
              <label className='w-full text-2xl'>Altura</label>
              <input type='number' name="altura" placeholder='Altura' className='p-2 mb-2 rounded-lg text-2xl w-full pl-2' defaultValue={productDetalle.altura} readOnly />
              
              <label className='w-full text-2xl'>Descripción</label>
              <input type='text' name="descripcion" placeholder='Descripción' className='p-2 mb-2 rounded-lg text-2xl w-full pl-2' defaultValue={productDetalle.descripcion} readOnly />
            </div>
          </div>
        </div>
      )}

      {/* FORMULARIO DE ACTUALIZACIÓN */}
      {openEdit && selectedProduct && (
        <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'> 
          <div className="text-black flex flex-col items-center justify-center">
            <form onSubmit={onSubmit} className='flex flex-col items-center justify-center p-3 w-100 h-full rounded-lg border-black bg-gray-100'>
              <div className='w-full flex items-center justify-between p-4 mb-3 bg-blue-200'>
                <h1 className="font-bold w-96 text-xl">Actualizar Producto</h1>
                <button type="button" onClick={() => setOpenEdit(false)} className='flex items-center justify-center hover:scale-110 border-2 bg-gray-100 w-8 h-8 pb-2 rounded-full'>x</button>
              </div>
              
              <label className='w-full text-2xl'>Nombre</label>
              <input type='text' placeholder='Nombre' className='p-2 mb-2 rounded-lg w-full text-lg' defaultValue={selectedProduct.nombre} {...register("nombre")} />
              {errors.nombre && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El nombre es requerido o esta duplicado"}</span>}

              <label className='w-full text-2xl'>Precio</label>
              <input type='number' placeholder='Precio' className='p-2 mb-2 rounded-lg w-full text-lg' defaultValue={selectedProduct.precio} {...register("precio")} />
              {errors.precio && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El precio es requerido"}</span>}
            
              <label className='w-full text-2xl'>Peso</label>
              <input type='number' placeholder='Peso' className='p-2 mb-2 rounded-lg w-full text-lg' defaultValue={selectedProduct.peso} {...register("peso")} />
              {errors.peso && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El peso es requerido"}</span>}
              
              <label className='w-full text-2xl'>Altura</label>
              <input type='number' placeholder='Altura' className='p-2 mb-2 rounded-lg w-full text-lg' defaultValue={selectedProduct.altura} {...register("altura")} />
              {errors.altura && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El altura es requerido"}</span>}
              
              <label className='w-full text-2xl'>Descripción</label>
              <textarea placeholder='Descripción' className='p-2 mb-2 rounded-lg min-h-20 w-full text-lg' defaultValue={selectedProduct.descripcion} {...register("descripcion")} />
              {errors.descripcion && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El descripcion es requerido"}</span>}
              
              <button type='submit'  className='w-full text-white border-separate bg-blue-600 rounded-md p-2 pr-4 pl-4 font-bold mt-2'>Actualizar</button>
            </form>
          </div>
        </div>
      )}

      {/* FORMULARIO DE CREACIÓN */}
      {openCreate && <FormCreatePage closeModal={closeCreateModal} />}
    </div>
  );
}

export default ProductosPages;

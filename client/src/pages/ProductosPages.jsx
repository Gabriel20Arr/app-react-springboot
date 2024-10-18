import React,{ useEffect, useState } from 'react'
import { useProductContext } from '../context/ProductContext';
import { useForm } from "react-hook-form";
import edit from '../assets/img/editar.png'
import eliminar from '../assets/img/eliminar.png'
import add from '../assets/img/agregar.png'

const ProductosPages = () => {
  const { product, getProducts, createProduct, deleteProduct, actualizarProduct, getProduct, idProduct, setIdProduct } = useProductContext();
  const [open, setOpen] = useState(false);
  const [openDetalle, setOpenDetalle] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);  // Estado para producto a crear/editar
  const [productDetalle, setProductDetalle] = useState(null);    // Estado para detalles del producto
  const { register, handleSubmit, reset } = useForm();
  
  useEffect(() => {
    async function getP() {
      const res = await getProducts();
    }
    getP();
  }, []);

  const openModal = (product = null) => {  // Recibe un producto (puede ser null para crear)
    setSelectedProduct(product);  // Si es null, es para crear, si es un producto, para editar
    setOpen(!open);
    reset(product || {});  
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    await getProducts();
  };

  const onSubmit = handleSubmit(async (values) => {
    if (selectedProduct) {
      await actualizarProduct({ ...values, id: selectedProduct.id });
    } else {
      // Si no hay producto seleccionado, es creación
      await createProduct(values);
    }
    await getProducts();  // Refrescamos la lista de productos
    setOpen(false);  // Cerramos el modal
    setSelectedProduct(null);  // Limpiamos el producto seleccionado
  });

  const handleDetalle = async (id) => {
    try {
      const res = await getProduct(id);  // Obtenemos los detalles completos del producto
      console.log("Detalles del producto:", res);
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
        <button onClick={() => openModal()} className='flex items-center justify-center hover:scale-110'>
          <img className='h-8 w-8'  src={add} alt="add"/>
        </button>
      </div>
      <div className="w-full grid grid-cols-3 gap-4">
        {product.length > 0 ? (
          product.map((item) => (
            <div key={item.id} className="flex flex-col items-center px-4 pb-4 border-2 bg-white shadow-md rounded-lg h-40 transition-all hover:scale-105 hover:shadow-lg">
              <div className='w-full flex items-center justify-end space-x-4 p-3'>
                <button onClick={() => openModal(item)} className='flex items-center justify-center  hover:scale-110'>
                  <img  className='h-6 w-6' src={edit} alt="editar"/>
                </button>
                <button onClick={() => handleDeleteProduct(item.id)} className='flex items-center justify-center hover:scale-110'>
                  <img className='h-6 w-6'  src={eliminar} alt="editar"/>
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

        {/* FORM PARA CREAR PRODUCTOS */}
        { open ? 
          <div className='fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50'> 
            <div className="text-black flex flex-col items-center justify-center">
              <form onSubmit={onSubmit} className='flex flex-col items-center justify-center p-3 w-100 h-full rounded-lg border-black bg-gray-100 '>
                <div className='w-full flex items-center justify-between p-4 mb-3 bg-blue-200'>
                  <h1 className=" font-bold w-96 text-x1">{selectedProduct ? "Actulizar Productos" : "Crear Productos"}</h1>
                  <button onClick={openModal} className='flex items-center justify-center hover:scale-110  border-2 bg-gray-100 w-8 h-8 pb-2 rounded-full'>x</button>
                </div>
                <input type='text' name="nombre" placeholder='Nombre' className='p-2 mb-2 rounded-lg w-full text-lg'
                defaultValue={selectedProduct ? selectedProduct.nombre : ""} 
                {...register("nombre")}
                />
                
                <input type='number' name="precio" placeholder='Precio' className='p-2 mb-2 rounded-lg w-full text-lg'  
                defaultValue={selectedProduct ? selectedProduct.precio : ""}
                {...register("precio")}
                />

                <input type='number' name="peso" placeholder='Peso' className='p-2 mb-2 rounded-lg w-full text-lg'  
                defaultValue={selectedProduct ? selectedProduct.peso : ""}
                {...register("peso")}
                />
                
                <input type='number' name="altura" placeholder='Altura' className='p-2 mb-2 rounded-lg w-full text-lg '  
                defaultValue={selectedProduct ? selectedProduct.altura : ""}
                {...register("altura")}
                />
                
                <textarea type='text' name="descripcion" placeholder='Descripcion' className='p-2 mb-2 rounded-lg min-h-20 w-full text-lg'  
                defaultValue={selectedProduct ? selectedProduct.descripcion : ""}
                {...register("descripcion")}
                />
                
                <button type='submit' className='border-2 rounded-md px-3 bg-white hover:bg-slate-200 mt-4'>{selectedProduct ? "Actualizar" : "Crear"}</button>
              </form>
            </div>
          </div> : 
          ''
        }
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
              <input type='text' name="nombre" placeholder='Nombre' className='p-2 mb-2 rounded-lg' defaultValue={productDetalle.nombre} readOnly />
              <input type='number' name="precio" placeholder='Precio' className='p-2 mb-2 rounded-lg' defaultValue={productDetalle.precio} readOnly />
              <input type='number' name="peso" placeholder='Peso' className='p-2 mb-2 rounded-lg' defaultValue={productDetalle.peso} readOnly />
              <input type='number' name="altura" placeholder='Altura' className='p-2 mb-2 rounded-lg' defaultValue={productDetalle.altura} readOnly />
              <input type='text' name="descripcion" placeholder='Descripción' className='p-2 mb-2 rounded-lg' defaultValue={productDetalle.descripcion} readOnly />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ProductosPages
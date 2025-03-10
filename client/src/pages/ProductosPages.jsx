import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useSearchContext } from '../context/SearchContext';
import { useForm } from "react-hook-form";
import { FormCreatePage } from './FormCreatePage';

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { TbFilterCode, TbFilterDollar } from "react-icons/tb";

import img from "../assets/img/img-mate-7.jpg";
import { Link } from 'react-router-dom';

const ProductosPages = () => {
  const { product, getProducts, deleteProduct, actualizarProduct, setErrorPut } = useProductContext();
  const [openCreate, setOpenCreate] = useState(false); // Modal para el form de creación
  const [openDetalle, setOpenDetalle] = useState(false); // Modal para ver detalles
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para producto seleccionado para editar
  const [openEdit, setOpenEdit] = useState(false); // Modal para el form de edición
  const [productDetalle, setProductDetalle] = useState(null); // Estado para detalles del producto

  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');
  const { register, handleSubmit, formState: {errors}, reset  } = useForm();

  const { searchTerm } = useSearchContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    let productsFiltered = [...product];

    // Filtrar por categoría o lo que ya tienes
    if (category) {
      productsFiltered = productsFiltered.filter(p => p.categoria === category);
    }

    // Filtrar por nombre basado en la búsqueda
    if (searchTerm) {
      productsFiltered = productsFiltered.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(productsFiltered);
  }, [product, category, sortType, searchTerm]);
  
  
  // Paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20; // Cambia según la cantidad deseada

  // Calcular el índice de los productos actuales
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  useEffect(() => {
    async function getP() {
      const dat=  await getProducts();
    }
    getP();
  }, []);

  // console.log("Products: ", product);
  useEffect(() => {
    let productsFiltered = [...product];
    
    if (category) {
      productsFiltered = productsFiltered.filter(p => p.categoria === category);
    }

    switch (sortType) {
      case 'priceAsc':
        productsFiltered.sort((a, b) => a.precio - b.precio);
        break;
      case 'priceDesc':
        productsFiltered.sort((a, b) => b.precio - a.precio);
        break;
      case 'nameAsc':
        productsFiltered.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nameDesc':
        productsFiltered.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      default:
        break;
    }

    setFilteredProducts(productsFiltered);
  }, [product, category, sortType]);
  

  // Cuando cambia el selectedProduct se resetea el form
  useEffect(() => {
    if (selectedProduct) {
      reset({
        nombre: selectedProduct.nombre,
        precio: selectedProduct.precio,
        peso: selectedProduct.peso,
        altura: selectedProduct.altura,
        descripcion: selectedProduct.descripcion,
        feactured: selectedProduct.feactured
      });
    }
  }, [selectedProduct, reset]);
  

  const onSubmit = handleSubmit(async (values) => {
    // Actualización de producto
    console.log(errors);
    
    try {
      if (selectedProduct) {
        await actualizarProduct({...values, id: selectedProduct.id });
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
      // Aquí ya se maneja el error en actualizarProduct
      setErrorPut(error)
      console.log("Error al actualizar producto: ", error);
    }
  });
  

  return (
    <div className="w-full min-h-svh flex flex-col items-center text-black font-bold text-xl p-8 mt-12 bg-white">
      <div className="w-full flex items-center justify-start mb-4">
      <TbFilterCode size={"1.5rem"} />
      <select onChange={(e) => setCategory(e.target.value)} className="bg-white p-2 mr-10 w-fit">
        <option value="">Todas las categorías</option>
        <option value="Mates">Mates</option>
        <option value="Termos">Termos</option>
        <option value="Yerbas">Yerbas</option>
        <option value="Bombillas">Bombillas</option>
        <option value="CanastaMatera">Canasta Matera</option>
        {/*
        {[...new Set(product.map(p => p.categoria))].map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
        */}
      </select>
      
      <TbFilterDollar size={"1.5rem"}/>
      <select onChange={(e) => setSortType(e.target.value)} className="bg-white p-2">
        <option value="">Ordenar por</option>
        <option value="priceAsc">Menor a Mayor</option>
        <option value="priceDesc">Mayor a Menor</option>
        <option value="nameAsc">A - Z</option>
        <option value="nameDesc">Z - A</option>
      </select>
    </div>

      {/* MOSTRAMOS PRODUCTOS */}
      <div className="flex flex-wrap justify-start gap-4 w-full text-xl">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
            <div key={item.id} className="flex flex-col items-center px-4 pb-4 border-2 bg-white shadow-md rounded-lg w-[280px] min-h-[400px] hover:shadow-2xl">
              <div className='flex flex-col justify-center h-fit w-full'>
                <Link to={`/producto-detalle/${item.id}`}>
                  <img src={img} className='h-auto w-58 my-4 border rounded-md'/>
                  <h2 className="font-heading text-xl truncate mb-1">{item.nombre}</h2>
                  <h2 className="text-sm font-sans text-textMuted mb-1 h-14 w-fit line-clamp-3">{item.descripcion}</h2>
                  <div className='flex justify-between mb-2'>
                    <span className='text-price  text-lg'>${item.precio}</span>
                    <span className='text-black  text-lg'>Stock: {item.stock}</span>
                  </div>
                </Link>
                <button 
                  className='border rounded-md font-heading text-lg w-full bg-green-500 hover:scale-105'
                  onClick={() => {alert(item.nombre)}}
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button 
            key={index} 
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded-md border ${currentPage === index + 1 ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            {index + 1}
          </button>
        ))}
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
              <input type='text' placeholder='Nombre' className='p-2 mb-2 rounded-lg w-full text-lg' {...register("nombre")} />
              {errors.nombre && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El nombre es requerido o esta duplicado"}</span>}

              <label className='w-full text-2xl'>Precio</label>
              <input type='number' placeholder='Precio' className='p-2 mb-2 rounded-lg w-full text-lg'  {...register("precio", {min: 0})} min="0"/>
              {errors.precio && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El precio es requerido"}</span>}
            
              <label className='w-full text-2xl'>Peso</label>
              <input type='number' placeholder='Peso' className='p-2 mb-2 rounded-lg w-full text-lg'  {...register("peso", {min: 0})} min="0"/>
              {errors.peso && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El peso es requerido"}</span>}
              
              <label className='w-full text-2xl'>Altura</label>
              <input type='number' placeholder='Altura' className='p-2 mb-2 rounded-lg w-full text-lg'  {...register("altura", {min: 0})} min="0"/>
              {errors.altura && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El altura es requerido"}</span>}
              
              <label className='w-full text-2xl'>Descripción</label>
              <textarea placeholder='Descripción' className='p-2 mb-2 rounded-lg min-h-20 w-full text-lg'  {...register("descripcion")} />
              {errors.descripcion && <span className="w-full pl-2 mb-2 text-xl text-red-600 rounded-lg">{"El descripcion es requerido"}</span>}

              <label className='w-full text-2xl'>¿Destacar producto?</label>
              <select 
                {...register("featured")} 
                className="p-2 mb-2 rounded-lg border border-gray-300"
              >
                <option value="false">No destacar</option>
                <option value="true">Destacar</option>
              </select>

              
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

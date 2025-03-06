import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useForm } from "react-hook-form";
import edit from '../assets/img/editar.png';
import eliminar from '../assets/img/eliminar.png';
import add from '../assets/img/agregar.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { TbFilterCode, TbFilterDollar } from "react-icons/tb";
import imgTest from "../assets/img/imgP-Dest/test-1-yerba.webp"

import { FormCreatePage } from "../pages/FormCreatePage"

const ProductosPagesDash = () => {
  const { product, getProducts, deleteProduct, actualizarProduct, setErrorPut } = useProductContext();
  const [openCreate, setOpenCreate] = useState(false); // Modal para el form de creación
  const [openEdit, setOpenEdit] = useState(false); // Modal para el form de creación
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue  } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7; // Cambia según la cantidad deseada

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


    // Abrir y cerrar el modal de creación
    const openCreateModal = () => {
      setOpenCreate(true);
    };
  
    const closeCreateModal = () => {
      setOpenCreate(false);
    };
  
    // Cuando cambia el selectedProduct se resetea el form
    useEffect(() => {
      if (selectedProduct) {
          setValue("nombre", selectedProduct.nombre);
          setValue("precio", selectedProduct.precio);
          setValue("peso", selectedProduct.peso);
          setValue("altura", selectedProduct.altura);
          setValue("ancho", selectedProduct.ancho);
          setValue("stock", selectedProduct.stock);
          setValue("descripcion", selectedProduct.descripcion);
          setValue("categoria", selectedProduct.categoria);
          setValue("featured", selectedProduct.featured ? "true" : "false");
      }
    }, [selectedProduct, setValue ]);
    
  
    // Función para abrir el modal de actualización
    const handleEditProduct = (item) => {
      console.log("Item: ", item);
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
    <div className="max-w-full min-h-svh flex flex-col items-center text-black font-bold text-xl p-8 mt-12 bg-white overflow-hidden">
      <div className="w-full flex items-center justify-between text-black">
        <h1 className="font-bold mb-4 text-2xl">Productos</h1>
        <button onClick={openCreateModal} className='hover:scale-110'><img className='h-8 w-8' src={add} alt="add" /></button>
      </div>

      <div className="w-full flex items-center justify-start mb-4">
        <TbFilterCode size="1.5rem" />
        <select onChange={(e) => setCategory(e.target.value)} className="bg-white p-2 mr-10 w-fit">
          <option value="">Todas las categorías</option>
          <option value="Mates">Mates</option>
          <option value="Termos">Termos</option>
          <option value="Yerbas">Yerbas</option>
          <option value="Bombillas">Bombillas</option>
          <option value="CanastaMatera">Canasta Matera</option>
        </select>
        
        <TbFilterDollar size="1.5rem" />
        <select onChange={(e) => setSortType(e.target.value)} className="bg-white p-2">
          <option value="">Ordenar por</option>
          <option value="priceAsc">Menor a Mayor</option>
          <option value="priceDesc">Mayor a Menor</option>
          <option value="nameAsc">A - Z</option>
          <option value="nameDesc">Z - A</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
      <table className="min-w-full text-left border-collapse bg-gray-100">
        <thead>
          <tr>
            <th className="border p-2">Imagen</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Altura</th>
            <th className="border p-2">Ancho</th>
            <th className="border p-2">Peso</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Categoria</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <tr key={item.id} className="border font-sans text-text text-lg">
                <td className="p-1"><img src={imgTest} className='w-20 h-20' /></td>
                <td className="border p-2">{item.nombre}</td>
                <td className="px-2 w-fit line-clamp-3">{item.descripcion}</td>
                <td className="border p-2">${item.precio}</td>
                <td className="border p-2">{item.altura}cm</td>
                <td className="border p-2">{item.ancho}cm</td>
                <td className="border p-2">{item.peso}g</td>
                <td className="border p-2">{item.stock}</td>
                <td className="border p-2">{item.categoria}</td>
                <td className="p-2 flex flex-col items-center gap-5">
                  <button onClick={() => handleEditProduct(item)}>
                    <img className='h-6 w-6' src={edit} alt="editar" />
                  </button>
                  <button onClick={() => handleDeleteProduct(item.id, item.nombre)}>
                    <img className='h-6 w-6' src={eliminar} alt="eliminar" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center p-4">No hay productos disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>
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


      {/* FORMULARIO DE ACTUALIZACIÓN */}
      {openEdit && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"> 
          <div className="w-[750px] bg-white p-6 rounded-2xl shadow-lg">
            <form onSubmit={onSubmit} className="flex flex-col gap-3">

              {/* Header con título y botón de cerrar */}
              <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded-lg">
                <h1 className="font-bold text-xl">Actualizar Producto</h1>
                <button 
                  type="button" 
                  onClick={() => setOpenEdit(false)} 
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
                <div className="flex flex-col flex-grow  max-h-[150px]">
                  <input 
                    type="text" 
                    placeholder="Nombre" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" 
                    {...register("nombre")} 
                  />
                  {errors.nombre && <span className="text-red-600 text-sm">El nombre es requerido o está duplicado</span>}

                  <label className="text-lg font-semibold mt-2">Precio</label>
                  <input 
                    type="number" 
                    placeholder="Precio" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
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
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
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
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
                    {...register("ancho", {min: 0})} 
                    min="0"
                    // readOnly
                  />
                </div>
              </div>

              {/* Peso + Stock */}
              <div className="flex gap-3 w-full ">
                <div className="flex flex-col w-full">
                  <label className="text-lg font-semibold">Peso</label>
                  <input 
                    type="number" 
                    placeholder="Peso" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
                    {...register("peso", {min: 0})} 
                    min="0"
                  />
                  {errors.peso && <span className="text-red-600 text-sm">El peso es requerido</span>}
                </div>
                
                <div className="flex flex-col w-full">
                  <label className="text-lg font-semibold">Stock</label>
                  <input 
                    type="number" 
                    placeholder="stock" 
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    {...register("stock", {min: 0})} 
                    min="0"
                  />
                  {errors.stock && <span className="text-red-600 text-sm">El stock es requerido</span>}
                </div>
              </div>

              {/* Categoria */}
              <label className="text-lg font-semibold mt-2">Categoria</label>
              <input 
                type="text" 
                placeholder="Nombre Categoria" 
                className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"  
                {...register("categoria", {min: 0})} 
                min="0"
              />
              {errors.precio && <span className="text-red-600 text-sm">La categoria es requerida</span>}

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
                Actualizar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FORMULARIO DE CREACIÓN */}
      {openCreate && <FormCreatePage closeModal={closeCreateModal} />}

    </div>
  );
};

export default ProductosPagesDash;

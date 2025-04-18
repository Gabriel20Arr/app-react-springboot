import React, { useEffect, useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { useSearchContext } from '../context/SearchContext';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import edit from '../assets/img/editar.png';
import eliminar from '../assets/img/eliminar.png';
import add from '../assets/img/agregar.png';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { TbFilterCode, TbFilterDollar } from "react-icons/tb";
import imgTest from "../assets/img/OIP.jpg"
import Style from "../components/styles.module.css"

import { FormCreatePage } from "../pages/FormCreatePage";

const ProductosPagesDash = ({ setIsModalOpen }) => {
  const { products, getProducts, deleteProduct, actualizarProduct, setErrorPut } = useProductContext();
  const { user, isAuthtenticated } = useAuthContext();
  const navigate = useNavigate();
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const { searchTerm } = useSearchContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 7;
  
  // Verificar si el usuario es admin
  useEffect(() => {
    if (!isAuthtenticated || !user?.roles?.[0] || user.roles[0].id === 2) {
      navigate('/');
    }
  }, [isAuthtenticated, user, navigate]);

  // Cargar productos al montar el componente
  useEffect(() => {
    getProducts();
  }, []);

  // Filtrar y ordenar productos cuando cambian los filtros o productos
  useEffect(() => {
    if (!products) return;
    
    let productsFiltered = [...products];

    // Filtrar por categoría
    if (category) {
      productsFiltered = productsFiltered.filter(p => p.categoria === category);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      productsFiltered = productsFiltered.filter(p =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Ordenar productos
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
    // Reset a la primera página cuando cambian los filtros
    setCurrentPage(1);
  }, [products, category, sortType, searchTerm]);

  // Calcular productos para la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);

  // Paginación
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= pageCount) {
      setCurrentPage(pageNumber);
    }
  };

  // Gestión de modales
  const openCreateModal = () => {
    setOpenCreate(true);
  };

  const closeCreateModal = () => {
    setOpenCreate(false);
  };
  
  // Actualizar formulario cuando se selecciona un producto
  useEffect(() => {
    if (selectedProduct) {
      setValue("id", selectedProduct.id);
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
  }, [selectedProduct, setValue]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length + imagenes.length > 4) {
      Swal.fire({
        title: 'Error',
        text: 'Solo puedes subir hasta 4 imágenes',
        icon: 'error'
      });
      return;
    }

    const newImages = files.map(file => {
      const previewUrl = URL.createObjectURL(file);
      return { file, previewUrl };
    });

    setImagenes([...imagenes, ...newImages]);
    setPreviewUrls([...previewUrls, ...newImages.map(img => img.previewUrl)]);
  };

  const removeImage = (index) => {
    const newImages = [...imagenes];
    const newPreviewUrls = [...previewUrls];
    
    // Liberar la URL del objeto
    URL.revokeObjectURL(newPreviewUrls[index]);
    
    newImages.splice(index, 1);
    newPreviewUrls.splice(index, 1);
    
    setImagenes(newImages);
    setPreviewUrls(newPreviewUrls);
  };

  const handleEditProduct = (item) => {
    setSelectedProduct(item);
    setExistingImages(item.imagenes || []);
    setImagenes([]);
    setPreviewUrls([]);
    setImagesToDelete([]);
    setOpenEdit(true);
  };

  const handleDeleteProduct = async (id, nombre) => {
    if (id) {
      const result = await Swal.fire({
        title: 'Eliminar producto',
        text: `¿Estás seguro de eliminar el producto: ${nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
  
      if (result.isConfirmed) {
        await deleteProduct(id);
        await getProducts();
        Swal.fire({
          text: 'Producto eliminado correctamente.',
          icon: 'success',
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          width: '300px'
        });
      }
    }
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
        if (selectedProduct) {
            const productData = {
                nombre: values.nombre,
                precio: values.precio,
                peso: values.peso,
                altura: values.altura,
                ancho: values.ancho,
                stock: values.stock,
                descripcion: values.descripcion,
                featured: values.featured,
                categoria: values.categoria,
                imagenes: imagenes.map(img => img.file),
                existingImages: existingImages,
                imagesToDelete: imagesToDelete
            };

            setLoadingEdit(true);
            const res = await actualizarProduct(selectedProduct.id, productData);
            // console.log(res);
            await getProducts();
            setLoadingEdit(false);

            // Limpiar estados y cerrar modal
            setOpenEdit(false);
            setSelectedProduct(null);
            setImagenes([]);
            setPreviewUrls([]);
            setImagesToDelete([]);
            
            Swal.fire({
                text: 'Producto actualizado correctamente.',
                icon: 'success',
                toast: true,
                position: 'bottom-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                width: '300px',
            });
        }
    } catch (error) {
        setErrorPut(error);
        console.error("Error al actualizar producto:", error);
    }
});


  // Si el usuario no está autenticado o no es admin, no renderizar nada
  if (!isAuthtenticated || !user?.roles?.[0] || user.roles[0].id === 2) {
    return null;
  }

  return (
    <div className="max-w-full min-h-svh flex flex-col items-center text-black font-bold text-xl p-8 mt-8 bg-white overflow-hidden rounded-lg">
      <div className="w-full flex items-center justify-between text-black">
        <h1 className="font-bold mb-4 text-2xl">Productos</h1>
        <button onClick={openCreateModal} className='hover:scale-110'>
          <img className='h-8 w-8' src={add} alt="add" />
        </button>
      </div>

      <div className="w-full flex items-center justify-start mb-4">
        <TbFilterCode size={"1.5rem"} />
        <select onChange={(e) => setCategory(e.target.value)} className="bg-white p-2 mr-10 w-fit">
          <option value="">Todas las categorías</option>
          <option value="Mates">Mates</option>
          <option value="Termos">Termos</option>
          <option value="Yerbas">Yerbas</option>
          <option value="Bombillas">Bombillas</option>
          <option value="CanastaMatera">Canasta Matera</option>
        </select>
        
        <TbFilterDollar size={"1.5rem"} />
        <select onChange={(e) => setSortType(e.target.value)} className="bg-white p-2">
          <option value="">Ordenar por</option>
          <option value="priceAsc">Menor a Mayor</option>
          <option value="priceDesc">Mayor a Menor</option>
          <option value="nameAsc">A - Z</option>
          <option value="nameDesc">Z - A</option>
        </select>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full text-left border-collapse shadow-lg">
          <thead>
            <tr>
              <th className="border  p-2">Imagen</th>
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
                  <td className="p-1">
                    <img 
                      src={item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : imgTest} 
                      className='w-20 h-20 object-cover' 
                      alt={item.nombre} 
                    />
                  </td>
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
      {pageCount > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md border ${
              currentPage === 1 ? 'bg-gray-200 text-gray-500' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Anterior
          </button>
          {Array.from({ length: pageCount }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-md border ${
                currentPage === index + 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageCount}
            className={`px-3 py-1 rounded-md border ${
              currentPage === pageCount ? 'bg-gray-200 text-gray-500' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Siguiente
          </button>
        </div>
      )}

      {/* Modal de creación */}
      {openCreate && (
        <FormCreatePage onClose={closeCreateModal} />
      )}

      {/* Modal de edición */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50">
          <div className="w-[1000px] h-[670px] bg-white p-5 rounded-2xl shadow-lg overflow-y-auto">
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              {/* Header con título y botón de cerrar */}
              <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded-lg">
                <h1 className="font-bold text-xl">Actualizar Producto</h1>
                <button
                  type="button"
                  onClick={() => {
                    setOpenEdit(false);
                    setSelectedProduct(null);
                    setImagenes([]);
                    setPreviewUrls([]);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-red-500 rounded-full text-white hover:bg-red-600 transition"
                >
                  ✕
                </button>
              </div>


              {/* Imagen + Nombre + Precio */}
              <div className="flex items-center">
                {/* Imagen */}
                <div className="flex">
                  <div className="flex items-center gap-2 mr-4">
                    <div className="relative">
                      <img
                        src={previewUrls.length > 0 ? previewUrls[0] : selectedProduct.imagenes[0] || imgTest}
                        alt="Preview"
                        className="w-[280px] h-auto mr-4 mb-3 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col w-full h-14">
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
                      {...register("precio", { min: 0 })}
                      min="0"
                    />
                    {errors.precio && <span className="text-red-600 text-sm">El precio es requerido</span>}
                  </div>
                </div>
              </div>

              {/* Imágenes */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imágenes del Producto (máximo 4)
                </label>
                
                {/* Imágenes existentes */}
                {existingImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border border-gray-300 p-2">
                  {existingImages.map((url, index) => (
                    <div key={`existing-${index}`} className="relative">
                      <img
                        src={url}
                        alt={`Imagen existente ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                )}

                {/* Input para nuevas imágenes */}
                {previewUrls.length < 4 && (
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                )}
                
                {previewUrls.length > 0 && (<p className="mt-1 text-sm text-gray-500">
                  Podes subir hasta 4 imágenes. Las imágenes deben ser en formato JPG, PNG o GIF.
                </p>
                )}

                {/* Imágenes nuevas */}
                {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 rounded-lg border border-gray-300 p-2 mt-2">
                  {previewUrls.map((url, index) => (
                    <div key={`new-${index}`} className="relative">
                      <img
                        src={url}
                        alt={`Nueva imagen ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-300 p-2"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                )}
              </div>  

              {/* Altura + Ancho */}
              <div className="flex gap-3 w-full">
                <div className="flex flex-col w-full">
                  <label className="text-lg font-semibold">Altura</label>
                  <input
                    type="number"
                    placeholder="Altura"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    {...register("altura", { min: 0 })}
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
                    {...register("ancho", { min: 0 })}
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
                    {...register("peso", { min: 0 })}
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
                    {...register("stock", { min: 0 })}
                    min="0"
                  />
                  {errors.stock && <span className="text-red-600 text-sm">El stock es requerido</span>}
                </div>
              </div>

              {/* Categoria */}
              <label className="text-lg font-semibold mt-2">Categoria</label>
              <select
                {...register("categoria")}
                className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="Mates">Mates</option>
                <option value="Termos">Termos</option>
                <option value="Yerbas">Yerbas</option>
                <option value="Bombillas">Bombillas</option>
                <option value="CanastaMatera">Canasta Matera</option>
              </select>

              {/* Descripcion */}
              <label className="text-lg font-semibold mt-2">Descripcion</label>
              <textarea
                placeholder="Descripcion"
                className="p-3 text-text font-sans border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                {...register("descripcion")}
              />

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
                disabled={loadingEdit}
              > 
                {loadingEdit ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className={Style.loader}></span>
                    <span className="ml-2">Actualizando...</span>
                  </div>
                ) : "Actualizar"}
              </button>
              </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default ProductosPagesDash;

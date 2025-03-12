import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useCartContext } from '../context/CartContext';
import { useSearchContext } from '../context/SearchContext';
import { useForm } from "react-hook-form";
import { FormCreatePage } from './FormCreatePage';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { TbFilterCode, TbFilterDollar } from "react-icons/tb";
import img from "../assets/img/OIP.jpg";

const ProductosPages = () => {
  const { products, getProducts, deleteProduct, actualizarProduct, setErrorPut } = useProductContext();
  const { addToCart } = useCartContext();
  const [openCreate, setOpenCreate] = useState(false); // Modal para el form de creación
  const [openDetalle, setOpenDetalle] = useState(false); // Modal para ver detalles
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para producto seleccionado para editar
  const [productDetalle, setProductDetalle] = useState(null); // Estado para producto seleccionado para ver detalles
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');
  const { register, handleSubmit, formState: {errors}, reset  } = useForm();

  const { searchTerm } = useSearchContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function getP() {
      const dat = await getProducts();
    }
    getP();
  }, []);

  useEffect(() => {
    let productsFiltered = [...(products || [])];

    // Filtrar por categoría
    if (category) {
      productsFiltered = productsFiltered.filter(product => product.categoria === category);
    }

    // Ordenar productos
    if (sortType) {
      productsFiltered.sort((a, b) => {
        switch (sortType) {
          case 'priceAsc':
            return a.precio - b.precio;
          case 'priceDesc':
            return b.precio - a.precio;
          case 'nameAsc':
            return a.nombre.localeCompare(b.nombre);
          case 'nameDesc':
            return b.nombre.localeCompare(a.nombre);
          default:
            return 0;
        }
      });
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      productsFiltered = productsFiltered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(productsFiltered);
  }, [products, category, sortType, searchTerm]);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    try {
      const response = await actualizarProduct(selectedProduct.id, values);
      if (response.ok) {
        Swal.fire({
          title: "¡Éxito!",
          text: "Producto actualizado correctamente",
          icon: "success"
        });
        setOpenEdit(false);
      } else {
        setErrorPut(true);
      }
    } catch (error) {
      console.log("Error al actualizar producto: ", error);
    }
  });

  return (
    <div className="w-full min-h-svh flex flex-col items-center text-black font-bold text-xl p-8 mt-12 bg-white">
      {/* FILTRADO */}
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
                  <img src={item.imagen || img} className={`max-h-50 w-auto my-4 border rounded-md ${item.stock <= 0 ? 'grayscale' : ''}`} alt={item.nombre}/>
                  <h2 className="font-heading text-xl truncate mb-1">{item.nombre}</h2>
                  <h2 className="text-sm font-sans text-textMuted mb-1 h-14 w-fit line-clamp-3">{item.descripcion}</h2>
                  <div className='flex justify-between mb-2'>
                    <span className='text-price text-lg'>${item.precio}</span>
                    <span className='text-black text-lg'>Stock: {item.stock}</span>
                  </div>
                </Link>
                <button 
                  className='border rounded-md font-heading text-lg w-full bg-green-500 hover:scale-105'
                  onClick={() => addToCart(item)}
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
    </div>
  );
}

export default ProductosPages;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductContext } from '../context/ProductContext';
import { useCartContext } from '../context/CartContext';
import { useSearchContext } from '../context/SearchContext';
import { useForm } from "react-hook-form";
import { TbFilterCode, TbFilterDollar, TbFilterX } from "react-icons/tb";
import img from "../assets/img/OIP.jpg";
import soldOut from "../assets/img/soldOut.png";
import ProductAnimation from '../components/ProductAnimation';

const ProductosPages = () => {
  const { products, getProducts } = useProductContext();
  const { addToCart } = useCartContext();
  const [category, setCategory] = useState('');
  const [sortType, setSortType] = useState('');
  const { register, handleSubmit, formState: {errors}, reset  } = useForm();
  const [animatingProduct, setAnimatingProduct] = useState(null);

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

  const handleAddToCart = (item, event) => {
    // Obtener la posición del botón clickeado
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const startPosition = {
      x: buttonRect.left + (buttonRect.width / 2),
      y: buttonRect.top + (buttonRect.height / 2)
    };
    
    setAnimatingProduct({ ...item, startPosition });
    addToCart(item);
  };

  const handleAnimationComplete = () => {
    setAnimatingProduct(null);
  };

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <option value="Yerberos">Yerberos</option>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full text-xl">
        {currentProducts.length > 0 ? (
          currentProducts.map((item) => (
            <div key={item.id} className="flex flex-col items-center px-4 pb-4 border-2 bg-white shadow-md rounded-lg w-[280px] min-h-[440px] hover:shadow-2xl relative">
              <div className='flex flex-col justify-center h-[420px] w-full'>
                <Link to={`/producto-detalle/${item.id}`}>
                  <div className='p-0 m-0 absolute top-0 left-4 right-4 bottom-0'>
                    <img src={item.imagenes[0] || img} className={`max-h-[220px] w-full my-4 border rounded-md`} alt={item.nombre} />
                    {item.stock <= 0 && <img src={soldOut} className='absolute top-1 left-[-18px] h-24 w-auto z-30' alt="soldOut" />}
                  </div>

                  <h2 className="font-heading text-xl truncate mb-1 absolute top-[250px] left-4 right-4">{item.nombre}</h2>
                  <h2 className="text-sm font-sans text-textMuted mb-1 h-14 w-fit line-clamp-3 absolute top-[280px] left-4 right-4">{item.descripcion}</h2>
                  <div className='flex justify-between mb-2 absolute top-[340px] left-4 right-4'>
                    <span className='text-price text-lg'>${item.precio}</span>
                    <span className='text-black text-lg'>Stock: {item.stock}</span>
                  </div>
                </Link>
                <button 
                  className='border rounded-md font-heading text-lg max-w-full mx-4 py-2 bg-green-500 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed absolute bottom-3 left-0 right-0'
                  onClick={(e) => handleAddToCart(item, e)}
                  disabled={item.stock <= 0}
                >
                  {item.stock <= 0 ? 'Sin stock' : 'Agregar al carrito'}
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

      {/* Animación */}
      {animatingProduct && (
        <ProductAnimation
          product={animatingProduct}
          startPosition={animatingProduct.startPosition}
          onAnimationComplete={handleAnimationComplete}
        />
      )}
    </div>
  );
}

export default ProductosPages;

import imageTest from "../assets/img/imgP-Dest/test-8-yerba.webp"

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"

import { useProductContext } from '../context/ProductContext';

const ProductosDestacados = () => {
  // const [products, setProducts] = useState(dataP);
  const [slidesToShow, setSlidesToShow] = useState(5);
  const { products, getProducts } = useProductContext();
  
  useEffect(() => {
    async function getP() {
      const dat =  await getProducts();
    }
    getP();
  }, []);
  
  const ProductFeatured = products.filter(prod => prod.featured === true);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSlidesToShow(5); // Pantallas grandes
      else if (width >= 1024) setSlidesToShow(4);
      else if (width >= 900) setSlidesToShow(3);
      else if (width >= 768) setSlidesToShow(3);
      else if (width >= 640) setSlidesToShow(2);
      else setSlidesToShow(1); // Móviles
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5, // Muestra 7 productos en pantallas grandes
    slidesToScroll: 1,
    autoplay: true, // Activa el movimiento automático
    autoplaySpeed: 3500, // Tiempo en milisegundos entre cada slide (3 segundos)
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } }, // 4 productos en pantallas medianas
      { breakpoint: 1024, settings: { slidesToShow: 4 } }, // 3 productos en laptops
      { breakpoint: 900, settings: { slidesToShow: 3 } },  // 2 productos en tablets
      { breakpoint: 768, settings: { slidesToShow: 3 } },  // 2 productos en tablets
      { breakpoint: 640, settings: { slidesToShow: 2 } }   // 1 producto en móviles
    ],
  };

  return (
    <div className="w-full px-5 mt-16 text-xl">
      <h1 className="font-heading text-2xl">Productos Destacados</h1>

      <div className="min-w-full max-w-4xl py-6" >
        <Slider {...settings} className="max-w-full">
        {ProductFeatured.map((product) => (
          <div key={product.id} className="px-2">
            <Link to={`/producto-detalle/${product.id}`}>
              <div className="bg-card shadow-md rounded-lg p-4 text-center">
                <img
                src={imageTest}
                alt={product.nombre}
                className="w-full h-38 object-cover rounded-lg"
                />
              <div className="mt-2 max-h-[155px] overflow-hidden">
                <h3 className="font-semibold font-heading text-lg truncate">{product.nombre}</h3>
                <p className="text-sm font-sans text-textMuted h-14 w-38 line-clamp-3">{product.descripcion}</p>
                <p className="font-bold text-lg text-price">${product.precio}</p>
              </div>
              </div>
            </Link>
          </div>
          ))}
          </Slider>
        </div>  
    </div>
  );
};

export default ProductosDestacados;

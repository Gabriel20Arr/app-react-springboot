import imageTest from "../assets/img/OIP.jpg"

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom"

import { useProductContext } from '../context/ProductContext';

const ProductosDestacados = () => {
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
      if (width >= 1280) setSlidesToShow(5);
      else if (width >= 1024) setSlidesToShow(4);
      else if (width >= 900) setSlidesToShow(3);
      else if (width >= 768) setSlidesToShow(3);
      else if (width >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 640, settings: { slidesToShow: 2 } }
    ],
  };

  return (
    <div className="w-full px-5 mt-16 text-xl">
      <h1 className="font-heading text-2xl">Productos Destacados</h1>

      <div className="min-w-full max-w-4xl py-6">
        <Slider {...settings} className="max-w-full">
          {ProductFeatured.map((product) => (
            <div key={product.id} className="px-2">
              <Link to={`/producto-detalle/${product.id}`}>
                <div className="bg-card shadow-md rounded-lg p-4 text-center w-[210px] h-[340px] mx-auto">
                  <div className="w-[180px] h-[180px] mx-auto mb-3 overflow-hidden rounded-lg">
                    <img
                      src={product.imagen || imageTest}
                      alt={product.nombre}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col h-[120px] justify-between">
                    <div>
                      <h3 className="font-semibold font-heading text-lg truncate px-1">{product.nombre}</h3>
                      <p className="text-sm font-sans text-textMuted line-clamp-2 h-10 px-1">{product.descripcion}</p>
                    </div>
                  <div className="flex justify-between">
                    <p className="text-lg font-bold text-price">${product.precio}</p>
                    <p className="text-sm text-textMuted">Stock: {product.stock}</p>
                  </div>
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

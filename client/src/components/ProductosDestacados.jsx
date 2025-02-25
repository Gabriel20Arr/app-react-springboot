import img1 from "../assets/img/imgP-Dest/test-1-yerba.webp"
import img2 from "../assets/img/imgP-Dest/test-2-yerba.webp"
import img3 from "../assets/img/imgP-Dest/test-5-yerba.webp"
import img4 from "../assets/img/imgP-Dest/test-7-yerba.webp"
import img5 from "../assets/img/imgP-Dest/test-8-yerba.webp"

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dataP = [
  {
    "id": 1,
    "name": "Yerba Mate Clásica",
    "image": img1,
    "price": 10.99,
    "description": "Yerba mate tradicional con un sabor intenso y duradero.",
    "category": "Yerba",
    "rating": 4.5
  },
  {
    "id": 2,
    "name": "Mate de Madera",
    "image": img2,
    "price": 15.99,
    "description": "Mate hecho de madera de bambu, ideal para disfrutar tu yerba organica.",
    "category": "Accesorios",
    "rating": 4.8
  },
  {
    "id": 3,
    "name": "Termo Acero Inoxidable",
    "image": img3,
    "price": 25.99,
    "description": "Termo de acero inoxidable con capacidad de 1 litro.",
    "category": "Accesorios",
    "rating": 4.6
  },
  {
    "id": 4,
    "name": "Bombilla de Acero",
    "image": img4,
    "price": 8.99,
    "description": "Bombilla de acero inoxidable con filtro desmontable.",
    "category": "Accesorios",
    "rating": 4.7
  },
  {
    "id": 5,
    "name": "Yerba Mate Orgánica",
    "image": img5,
    "price": 12.99,
    "description": "Yerba mate orgánica, sin conservantes ni aditivos.",
    "category": "Yerba",
    "rating": 4.9
  },
  {
    "id": 6,
    "name": "Termo Acero Inoxidable",
    "image": img3,
    "price": 25.99,
    "description": "Termo de acero inoxidable con capacidad de 1 litro.",
    "category": "Accesorios",
    "rating": 4.6
  },
]


const ProductosDestacados = () => {
  const [products, setProducts] = useState(dataP);
  const [slidesToShow, setSlidesToShow] = useState(5);

  // useEffect(() => {
  //   fetch("/productosDestacados.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

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
    speed: 500,
    slidesToShow: 7, // Muestra 5 productos en pantallas grandes
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 5 } }, // 4 productos en pantallas medianas
      { breakpoint: 1024, settings: { slidesToShow: 4 } }, // 3 productos en laptops
      { breakpoint: 900, settings: { slidesToShow: 3 } },  // 2 productos en tablets
      { breakpoint: 768, settings: { slidesToShow: 3 } },  // 2 productos en tablets
      { breakpoint: 640, settings: { slidesToShow: 2 } }   // 1 producto en móviles
    ],
  };

  return (
    <div className="w-full p-5">
      <h1 className="font-heading">Productos Destacados</h1>

      <div className="min-w-full max-w-4xl py-6">
        <Slider {...settings} className="max-w-full">
        {products.map((product) => (
          <div key={product.id} className="px-2">
            <div className="bg-card shadow-md rounded-lg p-4 text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-38 object-cover rounded-lg"
              />
              <div className="mt-2 max-h-[155px] overflow-hidden">
                <h3 className="font-semibold font-heading text-lg truncate">{product.name}</h3>
                <p className="text-sm font-sans text-textMuted h-14 w-38 line-clamp-3">{product.description}</p>
                <p className="font-bold text-lg text-price">${product.price}</p>
              </div>
            </div>
          </div>
          ))}
          </Slider>
        </div>  
    </div>
  );
};

export default ProductosDestacados;

import React, { useState, useEffect } from "react";

import imgCarrusel1 from "../assets/img/carrusel/img-1-c.png";
import imgCarrusel2 from "../assets/img/carrusel/img-2-c.png";
import imgCarrusel3 from "../assets/img/carrusel/img-3-c.png";
import imgCarrusel4 from "../assets/img/carrusel/img-4-c.png";

const items = [imgCarrusel1, imgCarrusel2, imgCarrusel3, imgCarrusel4];

const Carrusel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4500); // Cambia cada 3 segundos

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const next = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const previous = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full h-[280px] mx-auto overflow-hidden shadow-lg z-0 mt-[120px]">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {items.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Slide ${index}`}
            className="w-full h-[280px] flex-shrink-0 object-fill"
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={previous}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8592;
      </button>
      <button
        onClick={next}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
      >
        &#8594;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carrusel;

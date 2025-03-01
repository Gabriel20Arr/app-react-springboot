import React from 'react';

import imgMate from "../assets/img/carrusel/diseño-1.png"

const SobreNosotros = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-5xl bg-white shadow-lg rounded-lg p-8 mt-12">
        {/* Título */}
        <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Sobre Nosotros</h2>
        
        {/* Introducción */}
        <p className="text-gray-700 text-lg text-center mb-6">
          En <span className="font-bold text-green-600">Tu Mate</span>, vivimos la pasión por el mate y la cultura que lo rodea. 
          Creemos en la unión, la tradición y el placer de compartir momentos únicos con cada mate que tomamos.  
        </p>

        {/* Sección Historia y Misión */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700">Nuestra Historia</h3>
            <p className="text-gray-600 mt-2">
              MateClub nació de la idea de compartir el amor por esta tradición. Comenzamos como un pequeño grupo de amigos 
              y hoy somos una comunidad con miles de apasionados en todo el mundo.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700">Nuestra Misión</h3>
            <p className="text-gray-600 mt-2">
              Buscamos promover la tradición del mate a través de contenido educativo, eventos, recetas, entrevistas y 
              una selección de los mejores productos para que disfrutes al máximo cada sorbo.
            </p>
          </div>
        </div>

        {/* Sección de Valores */}
        <div className="mt-10">
          <h3 className="text-3xl font-bold text-green-700 text-center mb-4">Nuestros Valores</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-green-400 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-xl font-semibold text-green-700">Tradición</h4>
              <p className="text-gray-600">Valoramos y respetamos el ritual del mate como un símbolo de unión.</p>
            </div>
            <div className="bg-white border-2 border-green-400 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-xl font-semibold text-green-700">Comunidad</h4>
              <p className="text-gray-600">Creemos en compartir experiencias, conocimientos y buenos momentos.</p>
            </div>
            <div className="bg-white border-2 border-green-400 p-4 rounded-lg text-center shadow-sm">
              <h4 className="text-xl font-semibold text-green-700">Calidad</h4>
              <p className="text-gray-600">Seleccionamos los mejores productos y brindamos contenido de alto valor.</p>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="flex justify-center mt-10">
          <img 
            src={imgMate} 
            alt="Mate"
            className="rounded-lg shadow-lg w-full md:w-3/4"
          />
        </div>

        {/* Llamado a la Acción */}
        <div className="mt-10 text-center">
          <h3 className="text-2xl font-bold text-green-700 mb-2">Únete a Nuestra Comunidad</h3>
          <p className="text-gray-700 text-lg">
            Conéctate con otros amantes del mate, aprende nuevas recetas y comparte tu experiencia con nosotros.  
          </p>
          <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-bold hover:bg-green-700 transition">
            ¡Únete Ahora!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;

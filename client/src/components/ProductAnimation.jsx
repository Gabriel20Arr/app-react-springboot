import React, { useEffect, useRef, useState } from 'react';

const ProductAnimation = ({ product, onAnimationComplete, startPosition }) => {
  const animationRef = useRef(null);
  const [showMarker, setShowMarker] = useState(false);

  useEffect(() => {
    const element = animationRef.current;
    if (!element) return;

    // Obtener la posición del botón del carrito
    const cartButton = document.querySelector('.cart-button');
    if (!cartButton) return;

    const cartRect = cartButton.getBoundingClientRect();

    // Calcular la distancia y dirección desde la posición inicial del producto
    // Ajustamos 15px más arriba restando 15 a deltaY
    const deltaX = cartRect.left + (cartRect.width / 2) - startPosition.x;
    const deltaY = cartRect.top + (cartRect.height / 2) - startPosition.y - 55;

    // Debug: Mostrar información de posición
    // console.log('Posición del carrito:', {
    //   left: cartRect.left,
    //   top: cartRect.top,
    //   width: cartRect.width,
    //   height: cartRect.height,
    //   centerX: cartRect.left + (cartRect.width / 2),
    //   centerY: cartRect.top + (cartRect.height / 2)
    // });

    console.log('Posición inicial del producto:', startPosition);
    console.log('Delta calculado:', { deltaX, deltaY });

    // Mostrar el marcador temporalmente
    setShowMarker(true);
    setTimeout(() => setShowMarker(false), 2000);

    // Configurar la animación con una duración más larga (1.5 segundos)
    element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;
    element.style.opacity = '0';
    element.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';

    // Limpiar después de la animación
    const timer = setTimeout(() => {
      onAnimationComplete();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onAnimationComplete, startPosition]);

  return (
    <>
      <div
        ref={animationRef}
        className="fixed z-50 pointer-events-none"
        style={{
          left: `${startPosition.x}px`,
          top: `${startPosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
          willChange: 'transform, opacity'
        }}
      >
        <div className="relative">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-20 h-20 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-white opacity-0 rounded-lg transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Marcador visual de la posición final */}
      {showMarker && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: `${startPosition.x}px`,
            top: `${startPosition.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '10px',
            height: '10px',
            backgroundColor: 'red',
            borderRadius: '50%',
            boxShadow: '0 0 0 2px white, 0 0 0 4px red'
          }}
        />
      )}
    </>
  );
};

export default ProductAnimation; 
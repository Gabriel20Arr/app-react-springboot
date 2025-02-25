import React from 'react';

const SeccionEnvio = () => {
  return (
    <div className='w-full min-h-screen bg-gray-100 p-6 mt-12 text-black'>
      <h2 className='text-3xl font-bold text-center mb-6'>Información sobre Envíos</h2>
      
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Métodos de Envío</h3>
          <p>Ofrecemos envíos estándar y exprés a todo el país. Puedes elegir la opción que más te convenga al momento de la compra.</p>
        </div>
        
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Tiempos de Entrega</h3>
          <p>Los envíos estándar pueden demorar entre 3 y 7 días hábiles, mientras que los envíos exprés tardan entre 24 y 48 horas.</p>
        </div>
        
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Costo de Envío</h3>
          <p>El costo varía según la ubicación. En compras superiores a $50.000, el envío es totalmente gratuito.</p>
        </div>
        
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Seguimiento</h3>
          <p>Recibirás un código de seguimiento por correo electrónico para rastrear tu pedido en tiempo real.</p>
        </div>
        
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Zonas de Cobertura</h3>
          <p>Realizamos envíos a todas las provincias de Argentina. Para áreas rurales, recomendamos verificar disponibilidad.</p>
        </div>
        
        <div className='bg-white p-6 shadow-md rounded-lg'>
          <h3 className='text-xl font-semibold mb-2'>Atención al Cliente</h3>
          <p>Si tienes dudas sobre tu envío, puedes contactarnos al soporte o escribirnos por WhatsApp.</p>
        </div>
      </div>
    </div>
  );
};

export default SeccionEnvio;

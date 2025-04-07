import React from 'react';
import { useCartContext } from '../context/CartContext';

const Alert = () => {
  const { alert } = useCartContext();

  if (!alert.show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`p-4 rounded-lg shadow-lg ${
        alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white`}>
        {alert.message}
      </div>
    </div>
  );
};

export default Alert; 
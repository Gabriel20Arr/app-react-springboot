import React from 'react';
import { useCartContext } from '../context/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiX } from 'react-icons/fi';
import img from "../assets/img/img-mate-7.jpg";

const Cart = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartContext();

  const total = cart.reduce((sum, item) => sum + item.precio * item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Cart panel */}
      <div 
        className={`mt-12 fixed top-0 right-0 w-[400px] h-full text-black bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col max-h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Carrito de Compras</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Tu carrito está vacío</p>
              </div>
            ) : (
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4 p-2 bg-gray-50 rounded-lg">
                    <img
                      src={item.imagen || img}
                      alt={item.nombre}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{item.nombre}</h3>
                      <p className="text-sm text-gray-500">${item.precio}</p>
                      <div className="flex items-center mt-1">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FiMinus className="h-4 w-4" />
                        </button>
                        <span className="px-2 min-w-[2rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-200 rounded"
                        >
                          <FiPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-medium">Total</span>
              <span className="text-xl font-bold">${total.toFixed(2)}</span>
            </div>
            <div className="space-y-2">
              <button
                onClick={clearCart}
                className="w-full py-2 px-4 border border-red-500 text-red-500 rounded font-medium hover:bg-red-50 transition-colors"
              >
                Vaciar Carrito
              </button>
              <button 
                className="w-full py-2 px-4 bg-green-600 text-white rounded font-medium hover:bg-green-700 transition-colors"
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
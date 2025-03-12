import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({ initialData, isEditing }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData || {
    nombre: '',
    precio: '',
    peso: '',
    altura: '',
    ancho: '',
    stock: '',
    descripcion: '',
    featured: false,
    categoria: ''
  });
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialData?.imagen || '');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      const productData = new Blob([JSON.stringify(formData)], {
        type: 'application/json'
      });
      
      formDataToSend.append('producto', productData);
      if (imagen) {
        formDataToSend.append('imagen', imagen);
      }

      const url = isEditing 
        ? `/api/productos/${initialData.id}`
        : '/api/productos/nuevo';
      
      const method = isEditing ? 'PUT' : 'POST';
      
      await axios({
        method,
        url,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      navigate('/productos');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-4">
      <div className="space-y-4">
        {/* Imagen */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Imagen del Producto
          </label>
          <div className="mt-1 flex items-center space-x-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-20 w-20 object-cover rounded-md"
              />
            )}
          </div>
        </div>

        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Precio
          </label>
          <input
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            required
            step="0.01"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            required
            step="1"
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
            required
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Categoría
          </label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Dimensiones */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Peso (kg)
            </label>
            <input
              type="number"
              name="peso"
              value={formData.peso}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Altura (cm)
            </label>
            <input
              type="number"
              name="altura"
              value={formData.altura}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ancho (cm)
            </label>
            <input
              type="number"
              name="ancho"
              value={formData.ancho}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Featured */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-900">
            Destacado
          </label>
        </div>

        {/* Botón Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;

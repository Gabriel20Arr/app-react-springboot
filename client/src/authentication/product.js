import instance from "./axios";

// Obtener todos los productos (público)
export const productsRequest = () => instance.get("api/productos");

// Obtener productos del usuario actual
export const myProductsRequest = () => instance.get("api/productos/mis-productos");

// Obtener un producto específico
export const productRequest = (id) => instance.get(`api/productos/${id}`);

// Operaciones que requieren rol de admin
export const deleteProductRequest = (id) => instance.delete(`api/productos/${id}`);


export const actualizarProductRequest = (formData) => {
    const productoJson = formData.get('producto');
    const producto = JSON.parse(productoJson);
    
    if (!producto || !producto.id) {
        throw new Error('ID del producto es requerido');
    }

    return instance.put(`/api/productos/${producto.id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};



export const createProductRequest = formData => 
    instance.post("api/productos/nuevo", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
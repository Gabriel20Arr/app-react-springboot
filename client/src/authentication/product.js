import instance from "./axios";

// Obtener todos los productos (público)
export const productsRequest = () => instance.get("api/productos");

// Obtener productos del usuario actual
export const myProductsRequest = () => instance.get("api/productos/mis-productos");

// Obtener un producto específico
export const productRequest = (id) => instance.get(`api/productos/${id}`);

// Operaciones que requieren rol de admin
export const deleteProductRequest = (id) => instance.delete(`api/productos/${id}`);
export const actualizarProductRequest = (producto) => instance.put(`api/productos/${producto.id}`, producto);
export const createProductRequest = producto => instance.post("api/productos/nuevo", producto);
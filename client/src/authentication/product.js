import instance from "./axios";

export const productsRequest = token => instance.get("api/productos", {token});

export const productRequest = (id) => instance.get(`api/productos/${id}`);

export const deleteProductRequest = (id) => instance.delete(`api/productos/${id}`);

export const actualizarProductRequest = (producto) => instance.put(`api/productos/${producto.id}`, producto);

export const createProductRequest = producto => instance.post("api/productos/nuevo", producto);
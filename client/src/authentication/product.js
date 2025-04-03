import instance from "./axios";

// Obtener todos los productos (público)
export const productsRequest = () => instance.get("api/productos");

// Obtener productos del usuario actual
export const myProductsRequest = () => instance.get("api/productos/mis-productos");

// Obtener un producto específico
export const productRequest = (id) => instance.get(`api/productos/${id}`);

// Operaciones que requieren rol de admin
export const deleteProductRequest = (id) => instance.delete(`api/productos/${id}`);

// export const actualizarProductRequest = (id, data) => instance.put(`api/productos/${id}`, data);

// export const actualizarProductRequest = (formData) => {
//     const id = formData.get('producto') ? JSON.parse(formData.get('producto')).id : undefined;
//     if (!id) throw new Error('ID del producto es requerido');
    
//     return instance.put(`api/productos/${id}`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };


export const actualizarProductRequest = (formData) => {
    // Extraer el ID del producto del formData
    const productoJson = formData.get('producto');
    const producto = JSON.parse(productoJson);
    
    if (!producto) {
        throw new Error('Datos del producto no encontrados en FormData');
    }

    const id = producto.id;
    
    if (!id) {
        throw new Error('ID del producto es requerido');
    }

    // Crear un nuevo FormData con la estructura correcta
    const newFormData = new FormData();
    newFormData.append('producto', JSON.stringify(producto));

    // Si hay imagen, agregarla
    if (formData.has('imagen')) {
        newFormData.append('imagen', formData.get('imagen'));
    }

    return instance.put(`/api/productos/${id}`, newFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        }
    });
};


// export const actualizarProductRequest = (formData) => {
//     const productoJson = formData.get('producto'); 

//     if (!productoJson) {
//         throw new Error('Datos del producto no encontrados en FormData');
//     }

//     const producto = JSON.parse(productoJson);

//     if (!producto.id) {
//         throw new Error('ID del producto es requerido');
//     }

//     return instance.put(`api/productos/${producto.id}`, formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     });
// };


export const createProductRequest = formData => 
    instance.post("api/productos/nuevo", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
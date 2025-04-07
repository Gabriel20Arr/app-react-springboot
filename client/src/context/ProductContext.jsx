import { createContext, useContext, useState } from "react";
import { 
    productRequest, 
    createProductRequest, 
    productsRequest,
    myProductsRequest, 
    deleteProductRequest, 
    actualizarProductRequest 
} from "../authentication/product"

export const ProductContext = createContext();
export const useProductContext = () => {
    const context = useContext(ProductContext);
    if(!context) {
        throw new Error("useProduct tiene que estar dentro de un provider");
    }
    return context;
}

export function ProductProvider({children}) {
    const [products, setProducts] = useState([])
    const [myProducts, setMyProducts] = useState([])
    const [idProduct, setIdProduct] = useState([])
    const [errorPut, setErrorPut] = useState(null)
    const [errorPost, setErrorPost] = useState(null)

    const createProduct = async (producto) => {
        try {
            const res = await createProductRequest(producto);
            setErrorPost(null)
            // Actualizar la lista de productos después de crear uno nuevo
            await getProducts();
            await getMyProducts();
        } catch (error) {
            setErrorPost(error)
            console.log(error);
        }
    }

    const getProducts = async() => {
        try {
            const res = await productsRequest();
            // console.log(res);
            setProducts(res.data)
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    const getMyProducts = async() => {
        try {
            const res = await myProductsRequest();
            setMyProducts(res.data)
        } catch (error) {
            console.error("Error al obtener mis productos:", error);
        }
    }

    const getProduct = async (id) => {
        try {
            const res = await productRequest(id);
            setIdProduct(res.data);
            return res.data;
        } catch (error) {
            console.error("Error al obtener el producto:", error);
            return null;
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteProductRequest(id);
            // Actualizar ambas listas después de eliminar
            await getProducts();
            await getMyProducts();
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
        }
    }
    
    const actualizarProduct = async (id, producto) => {
        try {
            if (!id) {
                throw new Error("ID del producto es requerido");
            }
    
            const productoData = {
                id: id,
                nombre: producto.nombre,
                precio: parseFloat(producto.precio),
                peso: producto.peso ? parseFloat(producto.peso) : null,
                altura: producto.altura ? parseFloat(producto.altura) : null,
                ancho: producto.ancho ? parseFloat(producto.ancho) : null,
                stock: producto.stock ? parseFloat(producto.stock) : null,
                descripcion: producto.descripcion,
                featured: producto.featured === "true" || producto.featured === true,
                categoria: producto.categoria
            };
    
            const formData = new FormData();
            formData.append("producto", JSON.stringify(productoData));
    
            if (producto.imagen instanceof File) {
                formData.append("imagen", producto.imagen);
            }
    
            const res = await actualizarProductRequest(formData);
            console.log("res:", res);
            
            setErrorPut(null);
    
            await getProducts();
            await getMyProducts();
        } catch (error) {
            setErrorPut(error);
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    };
    
    
    return(
        <ProductContext.Provider value={{
            products,
            myProducts,
            createProduct,
            getProducts,
            getMyProducts,
            getProduct,
            idProduct, 
            setIdProduct,
            deleteProduct,
            actualizarProduct,
            errorPut,
            setErrorPut,
            errorPost
        }}>
            {children}
        </ProductContext.Provider>
    )
}
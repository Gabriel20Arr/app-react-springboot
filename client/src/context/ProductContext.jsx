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
            console.log(res);
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

    const actualizarProduct = async (producto) => {
        try {
            const formData = new FormData();
            
            // Convertir el objeto producto a FormData
            for (const key in producto) {
                formData.append(key, producto[key]);
            }
    
            await actualizarProductRequest(formData);
            setErrorPut(null);
    
            // Actualizar ambas listas después de actualizar
            await getProducts();
            await getMyProducts();
        } catch (error) {
            setErrorPut(error);
            console.error("Error al actualizar el producto:", error);
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